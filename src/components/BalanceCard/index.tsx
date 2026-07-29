import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
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

      <Text style={styles.label}>Wallet</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {isVisible ? formattedBalance : '••••••'}
        </Text>
        <View style={styles.containerIconCardAndNumber}>
          {renderIcon(type)}
          {/* numero de la targeta esconder todos los digitos (•••• 1234) */}
          <Text style={styles.numberOfCard}>
            •••• 1234
          </Text>
        </View>
      </View>

    </View>
  );
};
