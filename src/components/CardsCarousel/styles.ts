import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.m,
  },
  listContent: {
    // paddingHorizontal: theme.spacing.l,
  },
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
    backgroundColor: '#1E1F25',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(127, 86, 217, 0.5)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    marginTop: 8,
  },
  emptyCardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyCardSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
