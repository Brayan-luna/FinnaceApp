import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
