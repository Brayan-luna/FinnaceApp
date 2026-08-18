import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    listContent: {},
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 4,
    },
    emptyCard: {
      width: width * 0.85,
      height: 180,
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: colors.accent,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 20,
      marginTop: 8,
    },
    emptyCardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 12,
      marginBottom: 6,
      textAlign: 'center',
    },
    emptyCardSubtitle: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
