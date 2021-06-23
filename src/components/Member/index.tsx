import React from 'react';
import { View, Text } from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export interface MemberDTO {
  id: string;
  username: string;
  avatar_url: string;
  status: 'online' | 'offline';
}

interface AppointmentProps {
  data: MemberDTO;
}

export function Member({ data, ...rest }: AppointmentProps) {
  const { primary, on } = theme.colors;
  const isOnline = data.status === 'online';

  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View>
        <Text style={styles.title}>{data.username}</Text>
        <View style={styles.status}>
          <View
            style={[
              styles.bulletStatus,
              { backgroundColor: isOnline ? on : primary },
            ]}
          />
          <Text style={styles.statusName}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  );
}
