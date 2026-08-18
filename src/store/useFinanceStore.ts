import { create } from 'zustand';
import { Account, Transaction } from '../types';
import {
  initDatabase,
  fetchAccountsFromDB,
  insertAccountToDB,
  updateAccountBalanceInDB,
  fetchTransactionsFromDB,
  insertTransactionToDB,
} from '../db/database';

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  isInitialized: boolean;
  loadDatabase: () => Promise<void>;
  addAccount: (account: Account) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  accounts: [],
  transactions: [],
  isInitialized: false,

  loadDatabase: async () => {
    try {
      await initDatabase();
      const accounts = await fetchAccountsFromDB();
      const transactions = await fetchTransactionsFromDB();
      set({ accounts, transactions, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize SQLite Database:', error);
    }
  },

  addAccount: async (account) => {
    try {
      await insertAccountToDB(account);
      set((state) => ({
        accounts: [...state.accounts, account],
      }));
    } catch (error) {
      console.error('Failed to add account to SQLite:', error);
    }
  },

  addTransaction: async (transaction) => {
    try {
      await insertTransactionToDB(transaction);
      
      const currentAccounts = get().accounts;
      let targetAccount = currentAccounts.find((acc) => acc.id === transaction.accountId);
      
      const updatedAccounts = currentAccounts.map((acc) => {
        if (acc.id === transaction.accountId) {
          const change = transaction.type === 'income' ? transaction.amount : -transaction.amount;
          const newBalance = acc.balance + change;
          targetAccount = { ...acc, balance: newBalance };
          return targetAccount;
        }
        return acc;
      });

      if (targetAccount) {
        await updateAccountBalanceInDB(targetAccount.id, targetAccount.balance);
      }

      set((state) => ({
        transactions: [transaction, ...state.transactions],
        accounts: updatedAccounts,
      }));
    } catch (error) {
      console.error('Failed to add transaction to SQLite:', error);
    }
  },
}));
