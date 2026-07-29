import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: theme.spacing.m,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 60
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.sizes.body,
    marginBottom: theme.spacing.s,
    fontWeight: '500',
    flex: 1

  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.header * 1.5,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: theme.spacing.xs,
  },
  numberOfCard: {
    fontSize: theme.typography.sizes.small,
    color: '#FFF',
    fontWeight: '500',

  },
  containerIconCardAndNumber: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: 20
  }
});
