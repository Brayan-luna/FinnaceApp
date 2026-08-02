export type AccountType = 'bank' | 'cash' | 'debit_card' | 'credit_card';

export type TransactionType = 'income' | 'expense';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  color?: string;
  cardType?: PaymentIconType;
  notes?: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
}

export type PaymentIconType =
  | 'alipay'
  | 'amex'
  | 'american-express'
  | 'code'
  | 'cvv'
  | 'diners-club'
  | 'diners'
  | 'discover'
  | 'elo'
  | 'generic'
  | 'hiper'
  | 'hipercard'
  | 'jcb'
  | 'maestro'
  | 'mastercard'
  | 'master'
  | 'mir'
  | 'paypal'
  | 'unionpay'
  | 'visa';

export enum PaymentIconTypeKey {
  alipay = 'alipay',
  amex = 'amex',
  americanExpress = 'american-express',
  code = 'code',
  cvv = 'cvv',
  dinersClub = 'diners-club',
  diners = 'diners',
  discover = 'discover',
  elo = 'elo',
  generic = 'generic',
  hiper = 'hiper',
  hipercard = 'hipercard',
  jcb = 'jcb',
  maestro = 'maestro',
  mastercard = 'mastercard',
  master = 'master',
  mir = 'mir',
  paypal = 'paypal',
  unionpay = 'unionpay',
  visa = 'visa'
}