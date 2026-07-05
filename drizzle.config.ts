import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const dbType = process.env.DB_TYPE || 'sqlite';
const dbUrl = process.env.DB_URL || './sqlite.db';

const dialectMap = {
  sqlite: 'sqlite',
  postgres: 'postgresql',
  mysql: 'mysql',
} as const;

export default {
  schema: `./src/database/schema.${dbType}.ts`,
  out: './drizzle',
  dialect: dialectMap[dbType as keyof typeof dialectMap] || 'sqlite',
  dbCredentials: {
    url: dbUrl,
  },
} satisfies Config;
