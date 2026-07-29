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
  
  addTransaction: (transaction) => set((state) => ({ 
    transactions: [...state.transactions, transaction] 
  })),
}));
