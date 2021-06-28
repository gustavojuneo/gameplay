import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

export const TextArea = ({ ...rest }: TextInputProps) => (
  <TextInput style={styles.container} {...rest} />
);
