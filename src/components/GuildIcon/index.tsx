import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri =
    'https://static.wikia.nocookie.net/leagueoflegends/images/f/f2/League%2B.png/revision/latest?cb=20210516152058';
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
