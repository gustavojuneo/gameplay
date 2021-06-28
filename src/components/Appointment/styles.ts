import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  category: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    marginRight: 24,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
    marginLeft: 7,
  },
  player: {
    fontSize: 13,
    fontFamily: theme.fonts.text500,
    marginLeft: 7,
    marginRight: 24,
  },
  guildIconContainer: {
    width: 64,
    height: 68,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});
