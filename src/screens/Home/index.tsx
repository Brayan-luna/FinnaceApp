import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Animated, Pressable } from 'react-native';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from './styles';
import { CardsCarousel } from '../../components/CardsCarousel';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getCategoryMeta } from '../../context/AppContext';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { transactions, accounts, cashAccount, totalBalance, totalIncome, totalExpenses, themeColors, isDarkMode } = useApp();
  const styles = getStyles(themeColors);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const isLoading = useScreenLoading();

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (type: 'income' | 'expense') => {
    toggleMenu();
    navigation.navigate('AddTransaction', { transactionType: type });
  };

  // Helper to find account name by ID
  const getAccountName = (accountId: string): string => {
    const acc = accounts.find(a => a.id === accountId);
    if (!acc) return 'Account';
    if (acc.type === 'cash') return 'Cash';
    return acc.name || 'Card';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppSkeleton 
          isLoading={isLoading} 
          layout={layouts.homeSkeletonLayout}
          boneColor={isDarkMode ? '#1E1F25' : '#E5E7EB'}
          highlightColor={isDarkMode ? '#2E3039' : '#F3F4F6'}
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
            <Ionicons name="add" size={16} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        <CardsCarousel />

        {/* Cash row */}
        {cashAccount ? (
          <TouchableOpacity 
            style={styles.cashContainer} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddTransaction', { accountId: cashAccount.id, transactionType: 'expense' })}
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
                {formatCurrency(cashAccount.balance)}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={themeColors.textSecondary} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.cashContainer} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddCash')}
          >
            <View style={styles.cashLeftSection}>
              <View style={[styles.cashIconBg, { backgroundColor: themeColors.accentSubtle }]}>
                <Ionicons name="wallet-outline" size={20} color={themeColors.accent} />
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
            <Text style={styles.summaryCardValue}>{formatCurrency(totalIncome)}</Text>
            <Text style={styles.summaryCardChange}>
              {totalIncome > 0 ? 'this period' : '-- vs last month'}
            </Text>
          </View>

          {/* Expenses Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#FF5A5F' }]}>
              <Ionicons name="arrow-up" size={14} color="white" />
            </View>
            <Text style={styles.summaryCardLabel}>Expenses</Text>
            <Text style={styles.summaryCardValue}>{formatCurrency(totalExpenses)}</Text>
            <Text style={styles.summaryCardChange}>
              {totalExpenses > 0 ? 'this period' : '-- vs last month'}
            </Text>
          </View>

          {/* Balance Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#FFCC00' }]}>
              <Ionicons name="wallet" size={14} color="white" />
            </View>
            <Text style={styles.summaryCardLabel}>Balance</Text>
            <Text style={styles.summaryCardValue}>{formatCurrency(totalBalance)}</Text>
            <Text style={styles.summaryCardChange}>
              {transactions.length > 0 ? 'total' : '-- vs last month'}
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
            transactions.slice(0, 5).map((item) => {
              const isIncome = item.type === 'income';
              const cat = getCategoryMeta(item.category);
              const displayTitle = item.description || cat.name;
              const accountName = getAccountName(item.accountId);
              const displaySubtitle = `${item.date} • ${accountName}`;
              const amountText = `${isIncome ? '+' : '-'}${formatCurrency(Math.abs(item.amount))}`;
              const amountColor = isIncome ? themeColors.success : themeColors.text;

              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.transactionRow} 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('AddTransaction', { 
                    accountId: item.accountId, 
                    transactionType: item.type,
                    editTransaction: item,
                  })}
                >
                  <View style={styles.transactionLeft}>
                    <View style={[styles.transactionIconBg, { backgroundColor: cat.color }]}>
                      <Ionicons name={cat.icon as any} size={16} color="white" />
                    </View>
                    <View>
                      <Text style={styles.transactionTitle}>{displayTitle}</Text>
                      <Text style={styles.transactionSubtitle}>{displaySubtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, { color: amountColor }]}>{amountText}</Text>
                    <Ionicons name="chevron-forward" size={16} color={themeColors.textSecondary} style={{ marginLeft: 8 }} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        </AppSkeleton>
      </ScrollView>

      {/* Floating Action Button & Tooltip Menu */}
      {isMenuOpen && (
        <Pressable style={styles.backdrop} onPress={toggleMenu} />
      )}

      <View style={styles.fabContainer}>
        {/* Tooltip */}
        <Animated.View
          style={[
            styles.tooltipContainer,
            {
              opacity: animation,
              transform: [
                { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
                { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }
              ],
              pointerEvents: isMenuOpen ? 'auto' : 'none',
            }
          ]}
        >
          <TouchableOpacity
            style={styles.tooltipItem}
            activeOpacity={0.7}
            onPress={() => handleNavigate('income')}
          >
            <View style={[styles.tooltipIconCircle, { backgroundColor: '#34C759' }]}>
              <Ionicons name="arrow-down" size={16} color="white" />
            </View>
            <Text style={styles.tooltipText}>Add income</Text>
          </TouchableOpacity>

          <View style={styles.tooltipDivider} />

          <TouchableOpacity
            style={styles.tooltipItem}
            activeOpacity={0.7}
            onPress={() => handleNavigate('expense')}
          >
            <View style={[styles.tooltipIconCircle, { backgroundColor: '#FF5A5F' }]}>
              <Ionicons name="arrow-up" size={16} color="white" />
            </View>
            <Text style={styles.tooltipText}>Add expense</Text>
          </TouchableOpacity>

          {/* Arrow pointing down */}
          <View style={styles.tooltipArrow} />
        </Animated.View>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.8}
          onPress={toggleMenu}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '135deg'],
                  }),
                },
              ],
            }}
          >
            <Ionicons name="add" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
