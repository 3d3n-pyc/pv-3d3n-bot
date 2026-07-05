import 'dotenv/config';

export type DbType = 'sqlite' | 'postgres' | 'mysql';

export const config = {
  discordToken: process.env.DISCORD_TOKEN || '',
  clientId: process.env.CLIENT_ID || '',
  
  dbType: (process.env.DB_TYPE || 'sqlite') as DbType,
  dbUrl: process.env.DB_URL || './sqlite.db',
};
