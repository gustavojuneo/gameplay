import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface ListDiverProps {
  isCentered?: boolean;
}

export const ListDivider = ({ isCentered }: ListDiverProps) => (
  <View
    style={[
      styles.container,
      isCentered ? { marginVertical: 12 } : { marginTop: 2, marginBottom: 31 },
    ]}
  />
);
