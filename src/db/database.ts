import * as SQLite from 'expo-sqlite';
import { Account, Transaction } from '../types';

const DB_NAME = 'finance_app.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbInstance;
};

/**
 * Initializes database tables (accounts & transactions).
 */
export const initDatabase = async (): Promise<void> => {
  const db = await getDB();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      balance REAL NOT NULL,
      currency TEXT NOT NULL,
      color TEXT,
      cardType TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY NOT NULL,
      accountId TEXT NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (accountId) REFERENCES accounts (id) ON DELETE CASCADE
    );
  `);
};

/**
 * Accounts Database Queries
 */
export const fetchAccountsFromDB = async (): Promise<Account[]> => {
  const db = await getDB();
  const rows = await db.getAllAsync<Account>('SELECT * FROM accounts;');
  return rows;
};

export const insertAccountToDB = async (account: Account): Promise<void> => {
  const db = await getDB();
  await db.runAsync(
    `INSERT INTO accounts (id, name, type, balance, currency, color, cardType, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      account.id,
      account.name,
      account.type,
      account.balance,
      account.currency,
      account.color || null,
      account.cardType || null,
      account.notes || null,
    ]
  );
};

export const updateAccountBalanceInDB = async (id: string, newBalance: number): Promise<void> => {
  const db = await getDB();
  await db.runAsync('UPDATE accounts SET balance = ? WHERE id = ?;', [newBalance, id]);
};

/**
 * Transactions Database Queries
 */
export const fetchTransactionsFromDB = async (): Promise<Transaction[]> => {
  const db = await getDB();
  const rows = await db.getAllAsync<Transaction>('SELECT * FROM transactions ORDER BY rowid DESC;');
  return rows;
};

export const insertTransactionToDB = async (transaction: Transaction): Promise<void> => {
  const db = await getDB();
  await db.runAsync(
    `INSERT INTO transactions (id, accountId, type, amount, category, date, description)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      transaction.id,
      transaction.accountId,
      transaction.type,
      transaction.amount,
      transaction.category,
      transaction.date,
      transaction.description || null,
    ]
  );
};

export const updateTransactionInDB = async (transaction: Transaction): Promise<void> => {
  const db = await getDB();
  await db.runAsync(
    `UPDATE transactions SET accountId = ?, type = ?, amount = ?, category = ?, date = ?, description = ? WHERE id = ?;`,
    [
      transaction.accountId,
      transaction.type,
      transaction.amount,
      transaction.category,
      transaction.date,
      transaction.description || null,
      transaction.id,
    ]
  );
};
