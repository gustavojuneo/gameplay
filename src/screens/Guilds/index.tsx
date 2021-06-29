import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildDTO } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import { api } from '../../services/api';

import { styles } from './styles';

interface GuildsProps {
  onSelectGuild: (guildSelect: GuildDTO) => void;
}

export function Guilds({ onSelectGuild }: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => onSelectGuild(item)} />
          )}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
          ListHeaderComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
        />
      )}
    </View>
  );
}
