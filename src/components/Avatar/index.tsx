import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

interface AvatarProps {
  urlImage: string;
}

export function Avatar({ urlImage }: AvatarProps) {
  const { secondary50, secondary60 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary60]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar} />
    </LinearGradient>
  );
}
