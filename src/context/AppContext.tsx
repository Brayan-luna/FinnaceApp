import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Account, Transaction, PaymentIconType } from '../types';
import { ThemeColors, darkThemeColors, lightThemeColors } from '../constants/theme';
import {
  initDatabase,
  fetchAccountsFromDB,
  insertAccountToDB,
  updateAccountBalanceInDB,
  fetchTransactionsFromDB,
  insertTransactionToDB,
  updateTransactionInDB,
} from '../db/database';


// Shared category metadata for the whole app
export interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES_MAP: Record<string, CategoryMeta> = {
  shopping: { id: 'shopping', name: 'Shopping', icon: 'cart', color: '#9C27B0' },
  food: { id: 'food', name: 'Food & Drinks', icon: 'fast-food', color: '#E91E63' },
  transport: { id: 'transport', name: 'Transport', icon: 'car', color: '#2196F3' },
  housing: { id: 'housing', name: 'Housing', icon: 'home', color: '#FFC107' },
  health: { id: 'health', name: 'Health', icon: 'heart', color: '#34C759' },
  entertainment: { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: '#03A9F4' },
  education: { id: 'education', name: 'Education', icon: 'school', color: '#FF4081' },
  bills: { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#FF9800' },
  income: { id: 'income', name: 'Income', icon: 'arrow-down', color: '#34C759' },
  other: { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: '#9E9E9E' },
};

export const getCategoryMeta = (categoryId: string): CategoryMeta => {
  return CATEGORIES_MAP[categoryId] || CATEGORIES_MAP['other'];
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export interface AppContextType {
  // Theme & Appearance
  isDarkMode: boolean;
  themeColors: ThemeColors;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;

  // Database State & Actions
  isDBLoaded: boolean;
  accounts: Account[];
  transactions: Transaction[];
  addAccount: (account: Account) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  editTransaction: (transaction: Transaction) => Promise<void>;

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
  totalIncome: number;
  totalExpenses: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDBLoaded, setIsDBLoaded] = useState(false);

  // Initialize SQLite database and fetch stored data
  useEffect(() => {
    let isMounted = true;
    const loadDB = async () => {
      try {
        await initDatabase();
        const storedAccounts = await fetchAccountsFromDB();
        const storedTransactions = await fetchTransactionsFromDB();
        if (isMounted) {
          setAccounts(storedAccounts);
          setTransactions(storedTransactions);
          setIsDBLoaded(true);
        }
      } catch (error) {
        console.error('Failed to initialize SQLite Database in AppContext:', error);
      }
    };

    loadDB();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const addAccount = async (account: Account) => {
    try {
      await insertAccountToDB(account);
      setAccounts((prev) => [...prev, account]);
    } catch (error) {
      console.error('Failed to insert account into SQLite:', error);
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    try {
      await insertTransactionToDB(transaction);

      // Update account balance
      let updatedAccount: Account | null = null;
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) => {
          if (acc.id === transaction.accountId) {
            const change = transaction.type === 'income' ? transaction.amount : -transaction.amount;
            const newBalance = acc.balance + change;
            updatedAccount = { ...acc, balance: newBalance };
            return updatedAccount;
          }
          return acc;
        })
      );

      if (updatedAccount) {
        await updateAccountBalanceInDB((updatedAccount as Account).id, (updatedAccount as Account).balance);
      }

      setTransactions((prev) => [transaction, ...prev]);
    } catch (error) {
      console.error('Failed to insert transaction into SQLite:', error);
    }

      // Duplicate block removed
  };

  const editTransaction = async (transaction: Transaction) => {
    try {
      // Update transaction in DB
      await updateTransactionInDB(transaction);

      // Find original transaction to compute balance delta
      const original = transactions.find((t) => t.id === transaction.id);
      if (!original) {
        console.warn('Original transaction not found for edit');
        return;
      }

      // Compute balance change based on difference in amount and type
      const oldSigned = original.type === 'income' ? original.amount : -original.amount;
      const newSigned = transaction.type === 'income' ? transaction.amount : -transaction.amount;
      const delta = newSigned - oldSigned;

      let updatedAccount: Account | null = null;
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) => {
          if (acc.id === transaction.accountId) {
            const newBalance = acc.balance + delta;
            updatedAccount = { ...acc, balance: newBalance };
            return updatedAccount;
          }
          return acc;
        })
      );

      if (updatedAccount) {
        await updateAccountBalanceInDB((updatedAccount as Account).id, (updatedAccount as Account).balance);
      }

      // Update transaction list in state
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } catch (error) {
      console.error('Failed to edit transaction in SQLite:', error);
    }
  };

  const themeColors = useMemo(() => {
    return isDarkMode ? darkThemeColors : lightThemeColors;
  }, [isDarkMode]);

  // Selectors
  const cardAccounts = useMemo(() => {
    return accounts.filter((acc) => acc.type === 'credit_card' || acc.type === 'debit_card');
  }, [accounts]);

  const cashAccount = useMemo(() => {
    return accounts.find((acc) => acc.type === 'cash');
  }, [accounts]);

  // Global calculations
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

  const totalIncome = useMemo(() => {
    return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);

  const value = useMemo(() => ({
    isDarkMode,
    themeColors,
    toggleTheme,
    setDarkMode,
    isDBLoaded,
    accounts,
    transactions,
    addAccount,
    addTransaction,
    editTransaction,
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
    totalIncome,
    totalExpenses,
  }), [
    isDarkMode,
    themeColors,
    isDBLoaded,
    accounts,
    transactions,
    cardAccounts,
    cashAccount,
    totalCardBalance,
    cashBalance,
    totalBalance,
    totalIncome,
    totalExpenses,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
