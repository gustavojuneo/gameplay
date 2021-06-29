import React, { createContext, ReactNode, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

interface User {
  id: string;
  username: string;
  firstName: string;
  email: string;
  avatar: string;
  token: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    token_type: string;
    error?: string;
  };
};

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn() {
    try {
      setLoading(true);
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      console.log(params);
      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `${params.token_type} ${params.access_token}`;

        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const data = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        setUser(data);
        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(data));
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStoragedData() {
    setLoading(true);
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserStoragedData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
