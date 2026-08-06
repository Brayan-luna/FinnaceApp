import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.m,

  },
  greeting: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: theme.typography.sizes.header,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profilePicPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.border,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  balanceText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: theme.spacing.s,
  },
  iconButton: {
    padding: 8,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xs,
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addAccountButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
  },
  cashLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cashDetails: {
    justifyContent: 'center',
  },
  cashTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cashSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginTop: 2,
  },
  cashRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashAmount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: '32%',
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    padding: 12,
    justifyContent: 'space-between',
    minHeight: 120,
  },
  summaryIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  summaryCardLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    marginTop: 8,
  },
  summaryCardValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  summaryCardChange: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 9,
  },
  recentActivityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  viewAllText: {
    color: '#7F56D9',
    fontSize: 13,
    fontWeight: '600',
  },
  transactionsContainer: {
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    marginTop: 2,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAmount: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cashAddText: {
    color: '#7F56D9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyTransactionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyTransactionsIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(127, 86, 217, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTransactionsTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  emptyTransactionsSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
