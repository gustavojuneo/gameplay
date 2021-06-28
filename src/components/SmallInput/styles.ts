import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: 'center',
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
  },
});
