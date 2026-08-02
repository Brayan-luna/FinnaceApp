import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090A0C', // Premium dark
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.m,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  form: {
    marginTop: theme.spacing.s,
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
  },

  // Amount styles
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 58,
  },
  amountIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 0,
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E1F25',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Selector component styles
  selectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
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
    color: '#FFFFFF',
  },

  // Description input
  descInputContainer: {
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 64,
    justifyContent: 'space-between',
  },
  descInput: {
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0,
    flex: 1,
  },
  charCounter: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-end',
  },

  // Selected account row style
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
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
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountLogoCash: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    gap: 2,
  },
  accountName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  accountMeta: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
  },

  // Notes multiline
  notesContainer: {
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    height: 90,
    justifyContent: 'space-between',
  },
  notesInput: {
    color: '#FFFFFF',
    fontSize: 14,
    height: 52,
    textAlignVertical: 'top',
    padding: 0,
  },

  // Save Button
  submitButton: {
    marginTop: theme.spacing.l,
    borderRadius: 24,
    height: 52,
    overflow: 'hidden',
    shadowColor: '#7F56D9',
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
    paddingHorizontal: theme.spacing.m,
    paddingTop: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',

  },
  sheetItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131418',
    borderWidth: 1,
    borderColor: '#1E1F25',
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
    color: '#FFFFFF',
  },
  sheetGenericIconContainer: {
    width: 45,
    height: 30,
    backgroundColor: '#1E1F25',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Account item within bottomsheet
  accountSheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131418',
    borderWidth: 1,
    borderColor: '#1E1F25',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  accountSheetRowSelected: {
    borderColor: '#7F56D9',
    backgroundColor: '#1B1826',
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
    color: '#FFFFFF',
  },
  accountSheetBalance: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34C759',
  },
  accountSheetMeta: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FFFFFF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#131418',
    borderColor: '#1E1F25',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  categoryGridItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E1F25',
    backgroundColor: '#131418',
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
    backgroundColor: '#7F56D9',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.4)',
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
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    color: 'rgba(255, 255, 255, 0.3)',
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
    backgroundColor: '#7F56D9',
  },
  gridDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  gridDayTextDim: {
    color: 'rgba(255, 255, 255, 0.15)',
  },
  gridDayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7F56D9',
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
    backgroundColor: '#131418',
    borderWidth: 1,
    borderColor: '#1E1F25',
    borderRadius: 12,
    marginBottom: 4,
  },
  monthCellSelected: {
    backgroundColor: '#7F56D9',
    borderColor: '#7F56D9',
  },
  monthText: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  monthSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 2,
  },
  monthSubtextSelected: {
    color: 'rgba(255, 255, 255, 0.7)',
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
    backgroundColor: '#131418',
    borderWidth: 1,
    borderColor: '#1E1F25',
    borderRadius: 12,
    marginBottom: 4,
  },
  yearCellSelected: {
    backgroundColor: '#7F56D9',
    borderColor: '#7F56D9',
  },
  yearText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131418',
    borderWidth: 1,
    borderColor: '#1E1F25',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginVertical: 16,
  },
  dateBannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#FFFFFF',
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
  }
});
