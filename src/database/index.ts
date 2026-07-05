import { config } from '../config';
import * as schema from './schema';
import { Logger } from '../utils/logger';

export let db: any;

const initializeDatabase = async () => {
  if (config.dbType === 'postgres') {
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: config.dbUrl });
    db = drizzle(pool, { schema });
    Logger.success('PostgreSQL database initialized.');
  } 
  else if (config.dbType === 'mysql') {
    const { drizzle } = await import('drizzle-orm/mysql2');
    const mysql = await import('mysql2/promise');
    const connection = await mysql.createConnection(config.dbUrl);
    db = drizzle(connection, { schema, mode: 'default' });
    Logger.success('MySQL database initialized.');
  } 
  else {
    // Default to SQLite
    const { drizzle } = await import('drizzle-orm/better-sqlite3');
    const Database = (await import('better-sqlite3')).default;
    const sqlite = new Database(config.dbUrl);
    db = drizzle(sqlite, { schema });
    Logger.success('SQLite database initialized.');
  }
};

// Call the initialization when the file is imported
// Note: for top-level await to be fully synchronous in the exports, you usually call this before starting the bot.
// Since index.ts calls './database', we can just export an init function or use top level await if target supports it.
// We will just export the initialization promise.
export const dbInitPromise = initializeDatabase();
