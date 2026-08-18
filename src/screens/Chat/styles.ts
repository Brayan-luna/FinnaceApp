import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
