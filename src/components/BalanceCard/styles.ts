import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      paddingVertical: 24,
      paddingHorizontal: 24,
      borderRadius: 24,
      marginVertical: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
      height: 180,
      justifyContent: 'space-between',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
    },
    label: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    mainContentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      zIndex: 1,
    },
    leftColumn: {
      alignItems: 'flex-start',
    },
    rightColumn: {
      alignItems: 'flex-end',
    },
    balanceText: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: 'bold',
      letterSpacing: -0.5,
    },
    accountText: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: 12,
      marginTop: 4,
    },
    numberOfCard: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.4)',
      marginTop: 4,
    },
    containerIconCardAndNumber: {
      alignItems: 'flex-end',
    },
  });
