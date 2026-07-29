import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { styles } from './styles';
import { CardsCarousel } from '../../components/CardsCarousel';
import { QuickActions } from '../../components/QuickActions';
import { TransactionList } from '../../components/TransactionList';
import { TransactionItem, TransactionType } from '../../components/TransactionItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentIconTypeKey } from '../../types';
import { BottonSheet } from '../../components/BottonSheet';
import { FlatList } from 'react-native-gesture-handler';
import { theme } from '../../constants/theme';



export const HomeScreen = () => {
  const MOCK_TRANSACTIONS: TransactionType[] = [
    { id: '1', title: 'Grocery Store', date: 'Today', amount: -45.50, type: 'expense', categoryIcon: 'cart' },
    { id: '2', title: 'Salary Transfer', date: 'Yesterday', amount: 3200.00, type: 'income', categoryIcon: 'cash' },
    { id: '3', title: 'Electric Bill', date: 'Oct 12', amount: -120.00, type: 'expense', categoryIcon: 'flash' },
    { id: '4', title: 'Coffee Shop', date: 'Oct 11', amount: -4.50, type: 'expense', categoryIcon: 'cafe' },
    { id: '5', title: 'Grocery Store', date: 'Today', amount: -45.50, type: 'expense', categoryIcon: 'cart' },
    { id: '6', title: 'Salary Transfer', date: 'Yesterday', amount: 3200.00, type: 'income', categoryIcon: 'cash' },
    { id: '7', title: 'Electric Bill', date: 'Oct 12', amount: -120.00, type: 'expense', categoryIcon: 'flash' },
    { id: '8', title: 'Coffee Shop', date: 'Oct 11', amount: -4.50, type: 'expense', categoryIcon: 'cafe' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Alex Doe</Text>
          </View>
          <View style={styles.profilePicPlaceholder} />
        </View>
        <CardsCarousel />

      </ScrollView>
      <BottonSheet>
        <FlatList
          data={MOCK_TRANSACTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Since it might be inside a ScrollView in Home
          contentContainerStyle={{
            paddingBottom: theme.spacing.xl,
            paddingHorizontal: 20
          }}
        />
      </BottonSheet>
    </SafeAreaView>
  );
};
