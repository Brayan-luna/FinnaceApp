import React, { createContext, useContext, useState, useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Account, PaymentIconType } from '../types';
import { ThemeColors, darkThemeColors, lightThemeColors } from '../constants/theme';

export interface AppContextType {
  // Theme & Appearance
  isDarkMode: boolean;
  themeColors: ThemeColors;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;

  // Theme & Colors config
  cardColors: string[];
  cashColors: string[];
  getCardGradientColors: (color: string) => [string, string];
  getBalanceCardGradient: (color?: string) => [string, string, ...string[]];
  getAccountIcon: (type: string, cardType?: PaymentIconType, size?: number, color?: string) => React.ReactNode;

  // Account selectors
  cardAccounts: Account[];
  cashAccount: Account | undefined;

  // Global calculations
  totalCardBalance: number;
  cashBalance: number;
  totalBalance: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Unified global configurations
export const CARD_COLORS = [
  '#7F56D9', // Purple
  '#FF5A5F', // Coral/Red
  '#007AFF', // Blue
  '#FFCC00', // Yellow
  '#34C759', // Green
  '#8E8E93', // Grey
];

export const CASH_COLORS = [
  '#34C759', // Green
  '#FF5A5F', // Coral/Red
  '#007AFF', // Blue
  '#FFCC00', // Yellow
  '#7F56D9', // Purple
  '#8E8E93', // Grey
];

export const getCardGradientColors = (color: string): [string, string] => {
  switch (color) {
    case '#34C759': // Green
      return ['#34C759', '#0A2510'];
    case '#FF5A5F': // Coral/Red
      return ['#FF5A5F', '#3D1012'];
    case '#007AFF': // Blue
      return ['#007AFF', '#081C38'];
    case '#FFCC00': // Yellow
      return ['#FFCC00', '#3D3100'];
    case '#7F56D9': // Purple
      return ['#7F56D9', '#1A0E35'];
    case '#8E8E93': // Grey
      return ['#8E8E93', '#252528'];
    default:
      return [color, '#131418'];
  }
};

export const getBalanceCardGradient = (color?: string): [string, string, ...string[]] => {
  if (color) {
    return [color, '#131314', '#1E1F25'];
  }
  return ['#2b2b2eff', '#131314', '#5e5e63ff', '#2e2e34ff', '#9898bbff'];
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const accounts = useFinanceStore((state) => state.accounts);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const themeColors = useMemo(() => {
    return isDarkMode ? darkThemeColors : lightThemeColors;
  }, [isDarkMode]);

  // Filter only credit/debit card accounts
  const cardAccounts = useMemo(() => {
    return accounts.filter((acc) => acc.type === 'credit_card' || acc.type === 'debit_card');
  }, [accounts]);

  // Find cash account
  const cashAccount = useMemo(() => {
    return accounts.find((acc) => acc.type === 'cash');
  }, [accounts]);

  // Calculate balances
  const totalCardBalance = useMemo(() => {
    return cardAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [cardAccounts]);

  const cashBalance = useMemo(() => {
    return cashAccount ? cashAccount.balance : 0;
  }, [cashAccount]);

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const getAccountIcon = (type: string, cardType?: PaymentIconType, size: number = 24, color: string = '#FFFFFF') => {
    const ReactIcons = require('@expo/vector-icons');
    const { Ionicons } = ReactIcons;
    const { PaymentIcon } = require('react-native-payment-icons');

    if (type === 'cash') {
      return <Ionicons name="wallet-outline" size={size} color={color} />;
    }
    const iconType = cardType || 'generic';
    if (iconType === 'generic') {
      return <Ionicons name="card-outline" size={size} color={color} />;
    }
    return <PaymentIcon type={iconType} width={size * 1.7} />;
  };

  const value = useMemo(() => ({
    isDarkMode,
    themeColors,
    toggleTheme,
    setDarkMode,
    cardColors: CARD_COLORS,
    cashColors: CASH_COLORS,
    getCardGradientColors,
    getBalanceCardGradient,
    getAccountIcon,
    cardAccounts,
    cashAccount,
    totalCardBalance,
    cashBalance,
    totalBalance,
  }), [isDarkMode, themeColors, cardAccounts, cashAccount, totalCardBalance, cashBalance, totalBalance]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
