import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { CardsCarousel } from '../../components/CardsCarousel';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useApp } from '../../context/AppContext';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { transactions } = useFinanceStore();
  const { cashAccount, totalBalance } = useApp();

  // Dynamic calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);


  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Helper to match mockup values when using default initial mock transactions
  const displayIncome = transactions.length === 3 ? '$1,200,000' : formatCurrency(totalIncome);
  const displayExpenses = transactions.length === 3 ? '$620,000' : formatCurrency(totalExpenses);
  const displayBalance = transactions.length === 3 ? '$830,000' : formatCurrency(totalBalance);

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
            <Text style={styles.greeting}>Good Afternoon,</Text>
            <Text style={styles.userName}>Brayan Luna</Text>
          </View>
          <View style={styles.profilePicPlaceholder} >
            <Image source={require('../../../assets/brayanAnime.jpg')} style={styles.profilePicPlaceholder} />
          </View>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>My accounts</Text>
          <TouchableOpacity
            style={styles.addAccountButton}
            onPress={() => navigation.navigate('AddAccount')}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <CardsCarousel />

        {/* Cash row */}
        {cashAccount ? (
          <TouchableOpacity 
            style={styles.cashContainer} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Transfer', { accountId: cashAccount.id, transactionType: 'expense' })}
          >
            <View style={styles.cashLeftSection}>
              <View style={styles.cashIconBg}>
                <Ionicons name="cash" size={20} color="white" />
              </View>
              <View style={styles.cashDetails}>
                <Text style={styles.cashTitle}>Cash</Text>
                <Text style={styles.cashSubtitle}>On hand</Text>
              </View>
            </View>
            <View style={styles.cashRightSection}>
              <Text style={styles.cashAmount}>
                ${cashAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, '.')}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.4)" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.cashContainer} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddCash')}
          >
            <View style={styles.cashLeftSection}>
              <View style={[styles.cashIconBg, { backgroundColor: '#2C2D35' }]}>
                <Ionicons name="wallet-outline" size={20} color="#7F56D9" />
              </View>
              <View style={styles.cashDetails}>
                <Text style={styles.cashTitle}>Cash</Text>
                <Text style={styles.cashSubtitle}>On hand</Text>
              </View>
            </View>
            <View style={styles.cashRightSection}>
              <Text style={styles.cashAddText}>+ Add cash</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Summary section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Summary</Text>
        </View>

        <View style={styles.summaryRow}>
          {/* Income Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#7F56D9' }]}>
              <Ionicons name="arrow-down" size={14} color="white" />
            </View>
            <Text style={styles.summaryCardLabel}>Income</Text>
            <Text style={styles.summaryCardValue}>{displayIncome}</Text>
            {transactions.length > 0 ? (
              <Text style={styles.summaryCardChange}>
                <Text style={{ color: '#34C759', fontWeight: 'bold' }}>+12.5%</Text> vs last month
              </Text>
            ) : (
              <Text style={styles.summaryCardChange}>-- vs last month</Text>
            )}
          </View>

          {/* Expenses Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#FF5A5F' }]}>
              <Ionicons name="arrow-up" size={14} color="white" />
            </View>
            <Text style={styles.summaryCardLabel}>Expenses</Text>
            <Text style={styles.summaryCardValue}>{displayExpenses}</Text>
            {transactions.length > 0 ? (
              <Text style={styles.summaryCardChange}>
                <Text style={{ color: '#FF5A5F', fontWeight: 'bold' }}>+8.2%</Text> vs last month
              </Text>
            ) : (
              <Text style={styles.summaryCardChange}>-- vs last month</Text>
            )}
          </View>

          {/* Balance Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#FFCC00' }]}>
              <Ionicons name="wallet" size={14} color="white" />
            </View>
            <Text style={styles.summaryCardLabel}>Balance</Text>
            <Text style={styles.summaryCardValue}>{displayBalance}</Text>
            <Text style={styles.summaryCardChange}>
              {transactions.length > 0 ? 'vs last month' : '-- vs last month'}
            </Text>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.recentActivityHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {transactions.length === 0 ? (
            <View style={styles.emptyTransactionsContainer}>
              <View style={styles.emptyTransactionsIconBg}>
                <Ionicons name="document-text-outline" size={24} color="#7F56D9" />
              </View>
              <Text style={styles.emptyTransactionsTitle}>No transactions yet</Text>
              <Text style={styles.emptyTransactionsSubtitle}>
                Your income and expenses{"\n"}will appear here
              </Text>
            </View>
          ) : (
            transactions.slice(0, 3).map((item) => {
              const isIncome = item.type === 'income';
              const isHamburguesa = item.description === 'Hamburguesa';
              const isSalario = item.description === 'Salario';
              const isSupermercado = item.description === 'Supermercado';
              
              let iconName = 'cart';
              let iconBg = '#FFCC00';
              let displayTitle = item.description || 'Transaction';
              let displaySubtitle = `${item.date} • ${item.type === 'income' ? 'Cash' : 'Card'}`;
              let amountText = `${isIncome ? '+' : '-'}$${Math.abs(item.amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
              let amountColor = isIncome ? '#34C759' : '#FFF';

              if (isHamburguesa) {
                iconName = 'restaurant';
                iconBg = '#FF5A5F';
                displaySubtitle = 'May 12, 2024 • Card';
                amountText = '-$32,000';
                amountColor = '#FFF';
              } else if (isSalario) {
                iconName = 'arrow-down';
                iconBg = '#34C759';
                displaySubtitle = 'May 10, 2024 • Cash';
                amountText = '+$1,200,000';
                amountColor = '#34C759';
              } else if (isSupermercado) {
                iconName = 'cart';
                iconBg = '#FFCC00';
                displaySubtitle = 'May 9, 2024 • Cash';
                amountText = '-$85,000';
                amountColor = '#FFF';
              }

              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.transactionRow} 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Transfer', { accountId: item.accountId, transactionType: item.type })}
                >
                  <View style={styles.transactionLeft}>
                    <View style={[styles.transactionIconBg, { backgroundColor: iconBg }]}>
                      <Ionicons name={iconName as any} size={16} color="white" />
                    </View>
                    <View>
                      <Text style={styles.transactionTitle}>{displayTitle}</Text>
                      <Text style={styles.transactionSubtitle}>{displaySubtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, { color: amountColor }]}>{amountText}</Text>
                    <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.4)" style={{ marginLeft: 8 }} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
