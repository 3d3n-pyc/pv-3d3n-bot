import { config } from '../config';
import * as sqliteSchema from './schema.sqlite';
import * as pgSchema from './schema.pg';
import * as mysqlSchema from './schema.mysql';

let activeSchema: any;

if (config.dbType === 'postgres') {
  activeSchema = pgSchema;
} else if (config.dbType === 'mysql') {
  activeSchema = mysqlSchema;
} else {
  activeSchema = sqliteSchema;
}

// Export the active schema so other files can just import from './schema'
export const usersTable = activeSchema.usersTable;
