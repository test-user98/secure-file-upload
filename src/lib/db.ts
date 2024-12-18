import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT,
        mfaSecret TEXT
      );
      CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        path TEXT,
        size INTEGER,
        userId INTEGER,
        shared BOOLEAN,
        FOREIGN KEY(userId) REFERENCES users(id)
      );
    `);
  }
  return db;
}

export { openDb };

