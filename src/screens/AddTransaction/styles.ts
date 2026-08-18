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
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleContainer: {
      flex: 1,
      marginLeft: 16,
    },
    headerSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 2,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    form: {
      marginTop: 8,
      gap: 16,
    },
    formGroup: {
      gap: 8,
    },
    label: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },

    // Amount styles
    amountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 12,
      height: 58,
    },
    amountIconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.accentSubtle,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    amountInput: {
      flex: 1,
      color: colors.text,
      fontSize: 22,
      fontWeight: 'bold',
      padding: 0,
    },
    currencyPicker: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.accentSubtle,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    currencyText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.accent,
    },

    // Selector component styles
    selectorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 16,
      height: 54,
    },
    selectorLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    categoryBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectorTitle: {
      fontSize: 14.5,
      fontWeight: '600',
      color: colors.text,
    },

    // Description input
    descInputContainer: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      height: 64,
      justifyContent: 'space-between',
    },
    descInput: {
      color: colors.text,
      fontSize: 14,
      padding: 0,
      flex: 1,
    },
    charCounter: {
      fontSize: 10,
      color: colors.textSecondary,
      alignSelf: 'flex-end',
    },

    // Selected account row style
    accountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 58,
    },
    accountLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    accountLogoContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    accountLogoCash: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.accentSubtle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    accountInfo: {
      gap: 2,
    },
    accountName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
    },
    accountMeta: {
      fontSize: 11,
      color: colors.textSecondary,
    },

    // Notes multiline
    notesContainer: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
      height: 90,
      justifyContent: 'space-between',
    },
    notesInput: {
      color: colors.text,
      fontSize: 14,
      height: 52,
      textAlignVertical: 'top',
      padding: 0,
    },

    // Save Button
    submitButton: {
      marginTop: 24,
      borderRadius: 24,
      height: 52,
      overflow: 'hidden',
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    submitButtonGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },

    // BottomSheet content styles
    sheetContent: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      paddingBottom: 20
    },
    sheetItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 10,
    },
    sheetItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    sheetItemText: {
      fontSize: 14.5,
      fontWeight: 'bold',
      color: colors.text,
    },
    sheetGenericIconContainer: {
      width: 45,
      height: 30,
      backgroundColor: colors.background,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Account item within bottomsheet
    accountSheetRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 10,
    },
    accountSheetRowSelected: {
      borderColor: colors.accent,
      backgroundColor: colors.accentSubtle,
    },
    accountSheetLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    accountSheetInfo: {
      flex: 1,
      gap: 2,
    },
    accountSheetName: {
      fontSize: 14.5,
      fontWeight: 'bold',
      color: colors.text,
    },
    accountSheetBalance: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.success,
    },
    accountSheetMeta: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    radioOuter: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: colors.subtleIcon,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioOuterSelected: {
      borderColor: colors.accent,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.accent,
    },

    // Category grid inside BottomSheet
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    categoryGridItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
    },
    categoryGridItemText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
    },
    tabContainer: {
      flexDirection: 'row',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      height: 48,
      padding: 3,
      marginBottom: 16,
    },
    tabButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    tabButtonActive: {
      backgroundColor: colors.accent,
    },
    tabButtonText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    tabButtonTextActive: {
      color: '#FFFFFF',
    },
    navRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      marginBottom: 10,
    },
    navButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    weekHeaderRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    weekDayLabel: {
      flex: 1,
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    gridRow: {
      flexDirection: 'row',
      marginVertical: 4,
    },
    gridDayCell: {
      flex: 1,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 21,
    },
    gridDayCellSelected: {
      backgroundColor: colors.accent,
    },
    gridDayText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    gridDayTextDim: {
      color: colors.textSecondary,
      opacity: 0.4,
    },
    gridDayDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.accent,
      marginTop: 2,
    },
    gridDayDotSelected: {
      backgroundColor: '#FFFFFF',
    },
    monthGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'space-between',
    },
    monthCell: {
      width: '30%',
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 4,
    },
    monthCellSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    monthText: {
      fontSize: 13.5,
      fontWeight: 'bold',
      color: colors.text,
    },
    monthSubtext: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 2,
    },
    monthSubtextSelected: {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    yearGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'space-between',
    },
    yearCell: {
      width: '30%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 4,
    },
    yearCellSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    yearText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
    },
    dateBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingHorizontal: 16,
      height: 52,
      marginVertical: 16,
    },
    dateBannerText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 12,
    },
    actionButtonsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    cancelBtn: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelBtnText: {
      color: colors.text,
      fontSize: 14.5,
      fontWeight: 'bold',
    },
    confirmBtn: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      overflow: 'hidden',
    },
    confirmBtnGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmBtnText: {
      color: '#FFFFFF',
      fontSize: 14.5,
      fontWeight: 'bold',
    },
    dateAndIconSelected: {
      flexDirection: "row",
      alignItems: 'center',
      gap: 6
    },
    dateAndTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    noAccountsContainer: {
      paddingVertical: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noAccountsText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
      marginTop: 8,
      paddingHorizontal: 16,
    },
  });
