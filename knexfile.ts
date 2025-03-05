import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/development.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'data', 'production.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};

export default config;