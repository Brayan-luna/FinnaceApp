import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    header: {
      marginVertical: 16,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      marginBottom: 16,
    },
    categoryList: {
      gap: 12,
    },
    categoryItem: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryInfo: {
      flex: 1,
      gap: 4,
    },
    categoryName: {
      color: colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    progressBarBg: {
      height: 6,
      backgroundColor: colors.surfaceBorder,
      borderRadius: 3,
      width: '90%',
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 3,
    },
    categoryRight: {
      alignItems: 'flex-end',
      gap: 4,
    },
    categoryAmount: {
      color: colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    categoryPercentage: {
      color: colors.textSecondary,
      fontSize: 12,
    },
  });
