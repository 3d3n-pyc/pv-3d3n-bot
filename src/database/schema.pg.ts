import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  language: varchar('language', { length: 10 }).default('en').notNull(),
});
