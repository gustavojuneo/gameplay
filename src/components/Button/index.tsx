import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import DiscordImg from '../../assets/discord.svg';
import { styles } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <RectButton {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
