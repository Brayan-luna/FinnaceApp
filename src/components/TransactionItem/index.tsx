import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export interface TransactionType {
  id: string;
  title: string;
  description?: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  categoryIcon: keyof typeof Ionicons.glyphMap;
}

interface TransactionItemProps {
  transaction: TransactionType;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'income';

  const formattedAmount = Math.abs(transaction.amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, isIncome ? styles.iconIncome : styles.iconExpense]}>
          <Ionicons
            name={transaction.categoryIcon}
            size={20}
            color={isIncome ? theme.colors.success : theme.colors.danger}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{transaction.title}</Text>
          {transaction.description && <Text style={styles.description}>{transaction.description}</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, isIncome ? styles.amountIncome : styles.amountExpense]}>
          {isIncome ? '+' : '-'}{formattedAmount}
        </Text>
        <Text style={styles.time}>{transaction.date}</Text>
      </View>
    </View>
  );
};
