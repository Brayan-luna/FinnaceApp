import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  iconIncome: {
    backgroundColor: 'rgba(40, 167, 69, 0.15)', // light success
  },
  iconExpense: {
    backgroundColor: 'rgba(220, 53, 69, 0.15)', // light danger
  },
  details: {
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
  },
  amount: {
    fontSize: theme.typography.sizes.body,
    fontWeight: 'bold',
  },
  amountIncome: {
    color: theme.colors.success,
  },
  amountExpense: {
    color: theme.colors.text, // Often expenses are just default text color, but we could use danger color
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});
