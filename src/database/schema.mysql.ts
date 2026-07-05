import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  language: varchar('language', { length: 10 }).default('en').notNull(),
});
