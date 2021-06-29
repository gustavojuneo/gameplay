import React, { useEffect, useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import {
  ImageBackground,
  FlatList,
  View,
  Text,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Header } from '../../components/Header';
import { Member, MemberDTO } from '../../components/Member';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentDTO } from '../../components/Appointment';
import { Load } from '../../components/Load';

import BannerImg from '../../assets/banner.png';

import { api } from '../../services/api';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface GuildParams {
  appointment: AppointmentDTO;
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberDTO[];
}

export function AppointmentDetails() {
  const route = useRoute();
  const { appointment } = route.params as GuildParams;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  async function fetchGuildInfo() {
    try {
      const response = await api.get(
        `/guilds/${appointment.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch {
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${appointment.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointment.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
        resizeMode="cover"
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointment.guild.name}</Text>
          <Text style={styles.description}>{appointment.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total de ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            showsVerticalScrollIndicator={false}
            style={styles.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
          />
        </>
      )}

      {appointment.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
}
