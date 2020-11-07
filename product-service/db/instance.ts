import { Client } from 'pg';

const {
  PG_HOST,
  PG_DATABASE,
  PG_PORT,
  PG_USERNAME,
  PG_PASSWORD
} = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  sql: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

export const getDBInstance = () => {
  const client = new Client(dbOptions);

  return client;
}