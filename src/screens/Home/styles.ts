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
    paddingBottom: theme.spacing.xxl,
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
  gridContainer: {
    marginTop: theme.spacing.m,
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  transactionCard: {
    flex: 1.15,
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    padding: 16,
    height: 125,
    justifyContent: 'space-between',
  },
  cashbackCard: {
    flex: 1,
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    padding: 16,
    height: 125,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    marginTop: 2,
  },
  barChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barPurple: {
    width: 55,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6200EE',
  },
  barCoral: {
    width: 32,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF5A5F',
  },
  barBlue: {
    width: 8,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  barYellow: {
    width: 28,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFCC00',
  },
  barGreen: {
    width: 10,
    height: 14,
    borderRadius: 5,
    backgroundColor: '#34C759',
  },
  brandsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E1F25',
  },
  brandAdidas: {
    backgroundColor: '#0088FF',
  },
  brandMcdonalds: {
    backgroundColor: '#E51C23',
  },
  brandAmazon: {
    backgroundColor: '#000000',
  },
  brandSpotify: {
    backgroundColor: '#1DB954',
  },
  actionColumn: {
    width: 48,
    gap: 8,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1E1F25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#1E1F25',
    borderRadius: 20,
    padding: 14,
    height: 104,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  infoCardTitle: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: 'bold',
  },
});
