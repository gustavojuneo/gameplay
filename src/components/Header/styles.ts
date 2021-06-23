import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 24,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    marginLeft: -24,
    textAlign: 'center',
  },
});
