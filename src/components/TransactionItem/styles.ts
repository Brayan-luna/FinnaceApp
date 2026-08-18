import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
      marginRight: 16,
    },
    iconIncome: {
      backgroundColor: 'rgba(52, 199, 89, 0.15)',
    },
    iconExpense: {
      backgroundColor: 'rgba(255, 59, 48, 0.15)',
    },
    details: {
      justifyContent: 'center',
    },
    title: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 4,
    },
    description: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    amount: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    amountIncome: {
      color: colors.success,
    },
    amountExpense: {
      color: colors.text,
    },
    rightSection: {
      alignItems: 'flex-end',
    },
    time: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });
