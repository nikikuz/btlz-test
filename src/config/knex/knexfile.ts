import knex from 'knex';
import env from '#config/env/env.js';
import dotenv from 'dotenv';

dotenv.config()

console.log('RAW knex import:', knex);
console.log('TYPEOF knex:', typeof knex);

export const knexConfig = {
  client: 'pg',
  connection: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
  },
  migrations: {
    stub: "src/config/knex/migration.stub.ts",
    directory: "./src/postgres/migrations",
    tableName: "migrations",
    extension: "ts",
  },
  seeds: {
    stub: "src/config/knex/seed.stub.ts",
    directory: "./src/postgres/seeds",
    extension: "ts",
  },
};