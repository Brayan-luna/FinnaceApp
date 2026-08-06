import { create } from 'zustand';
import { Account, Transaction } from '../types';

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  addAccount: (account: Account) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [],
  transactions: [],

  addAccount: (account) => set((state) => ({
    accounts: [...state.accounts, account]
  })),

  addTransaction: (transaction) => set((state) => {
    const updatedAccounts = state.accounts.map((acc) => {
      if (acc.id === transaction.accountId) {
        const change = transaction.type === 'income' ? transaction.amount : -transaction.amount;
        return { ...acc, balance: acc.balance + change };
      }
      return acc;
    });
    return {
      transactions: [...state.transactions, transaction],
      accounts: updatedAccounts
    };
  }),
}));
