import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { PaymentIcon } from 'react-native-payment-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PaymentIconType } from '../../types';

interface BalanceCardProps {
  balance: number;
  type: PaymentIconType;
  parallaxTranslateX?: Animated.AnimatedInterpolation<number>;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, type, parallaxTranslateX }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const formattedBalance = balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  const renderIcon = (type: PaymentIconType) => {
    return <PaymentIcon type={type} width={50} color={"white"} />;
  };

  return (
    <View style={[styles.container, { overflow: 'hidden' }]}>
      <LinearGradient
        colors={['#2b2b2eff', '#131314', '#5e5e63ff', '#2e2e34ff', '#9898bbff']}
        locations={[0, 0.50, 0.49, 0.50, 1]}
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
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContentRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.balanceText}>
            {isVisible ? formattedBalance : '••••••'}
          </Text>
          <Text style={styles.accountText}>
            Account ** 3498
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.containerIconCardAndNumber}>
            {renderIcon(type)}
            <Text style={styles.numberOfCard}>
              •••• 1234
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
};
