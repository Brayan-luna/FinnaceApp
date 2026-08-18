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
    },
    scrollContent: {
      paddingBottom: 110,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginVertical: 16,
    },

    // Profile Card
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.background,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.accent,
      width: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.surface,
    },
    profileTextContainer: {
      flex: 1,
      marginLeft: 14,
    },
    profileName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    profileSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
    },

    // Section Labels
    sectionLabel: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.textSecondary,
      marginTop: 12,
      marginBottom: 8,
      marginLeft: 4,
    },

    // Cards & Rows
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
    },
    rowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: colors.accentSubtle,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    rowTextContainer: {
      flex: 1,
    },
    rowTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    rowSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
    },

    // Custom Controls
    currencyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.accentSubtle,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      gap: 4,
    },
    currencyText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.accent,
    },
    accentRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    accentCircle: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: colors.accent,
    },
  });
