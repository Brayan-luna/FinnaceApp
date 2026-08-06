import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { PaymentIcon } from 'react-native-payment-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useApp } from '../../context/AppContext';
import { PaymentIconType } from '../../types';

interface BalanceCardProps {
  balance: number;
  type?: string;
  cardType?: PaymentIconType;
  name?: string;
  color?: string;
  parallaxTranslateX?: Animated.AnimatedInterpolation<number>;
  onPressAdd?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ 
  balance, 
  type = 'debit_card', 
  cardType, 
  name, 
  color, 
  parallaxTranslateX,
  onPressAdd
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const { getAccountIcon, getBalanceCardGradient } = useApp();

  const formattedBalance = balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const gradientColors = getBalanceCardGradient(color);

  const gradientLocations = (color 
    ? [0, 0.7, 1] 
    : [0, 0.50, 0.49, 0.50, 1]) as [number, number, ...number[]];

  return (
    <View style={[styles.container, { overflow: 'hidden' }]}>
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 24,
        }}
      />

      <View style={styles.headerRow}>
        <Text style={styles.label}>Wallet</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressAdd}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContentRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.balanceText}>
            {isVisible ? formattedBalance : '••••••'}
          </Text>
          <Text style={styles.accountText}>
            {name || (type === 'cash' ? 'Cash' : 'Card Account')}
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.containerIconCardAndNumber}>
            {getAccountIcon(type, cardType, 30)}
            {type !== 'cash' && (
              <Text style={styles.numberOfCard}>
                •••• 1234
              </Text>
            )}
          </View>
        </View>
      </View>

    </View>
  );
};
