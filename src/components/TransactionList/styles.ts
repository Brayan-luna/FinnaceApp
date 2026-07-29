import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  title: {
    fontSize: theme.typography.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  seeAll: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});
