import React from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildDTO } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

interface GuildsProps {
  onSelectGuild: (guildSelect: GuildDTO) => void;
}

export function Guilds({ onSelectGuild }: GuildsProps) {
  const guilds: GuildDTO[] = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '2',
      name: 'Valorosos',
      icon: 'image.png',
      owner: false,
    },
  ];

  return (
    <View style={styles.container}>
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
    </View>
  );
}
