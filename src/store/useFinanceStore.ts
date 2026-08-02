import { create } from 'zustand';
import { Account, Transaction } from '../types';

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  addAccount: (account: Account) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [
    { id: '1', name: 'Visa Gold', type: 'credit_card', balance: 12450.75, currency: 'USD', cardType: 'visa', color: '#7F56D9' },
    { id: '2', name: 'Mastercard Debit', type: 'debit_card', balance: 3500.00, currency: 'USD', cardType: 'mastercard', color: '#FF5A5F' },
    { id: '3', name: 'Main Cash', type: 'cash', balance: 850.50, currency: 'USD', color: '#34C759' },
  ],
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
