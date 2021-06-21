import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableOpacityProps,
} from 'react-native';

import DiscordImg from '../../assets/discord.svg';
import { styles } from './styles';

interface ButtonIconProps extends TouchableOpacityProps {
  title: string;
}

export function ButtonIcon({ title, ...rest }: ButtonIconProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <View style={styles.iconWrapper}>
        <DiscordImg width={24} height={18} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
