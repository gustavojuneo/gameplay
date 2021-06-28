import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

export const SmallInput = ({ ...rest }: TextInputProps) => (
  <TextInput style={styles.container} {...rest} keyboardType="numeric" />
);
