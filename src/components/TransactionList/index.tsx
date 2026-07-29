import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { TransactionItem, TransactionType } from '../TransactionItem';

interface TransactionListProps {
  transactions: TransactionType[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Since it might be inside a ScrollView in Home
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
