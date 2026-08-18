import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 16,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
    },
    header: {
      marginBottom: 10,
    },
    dateRange: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    label: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 4,
    },
    amount: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: -0.5,
    },
    chartWrapper: {
      alignItems: 'center',
      marginVertical: 5,
      paddingRight: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.surfaceBorder,
      paddingTop: 12,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
    },
    navButtonText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '500',
    },
    arrowCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.accentSubtle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceBorder,
      borderRadius: 99,
      padding: 4,
      width: 170,
      justifyContent: 'space-between',
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 99,
    },
    toggleButtonActive: {
      backgroundColor: colors.text,
    },
    toggleTextActive: {
      color: colors.surface,
      fontWeight: 'bold',
      fontSize: 13,
    },
    toggleTextInactive: {
      color: colors.textSecondary,
      fontWeight: '600',
      fontSize: 13,
    },
    containerDateRangeAndSelectors: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between"
    }
  });
