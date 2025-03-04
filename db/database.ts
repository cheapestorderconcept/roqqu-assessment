import knex from 'knex';
import config from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const db = knex(dbConfig);

// Handle database connection events
db.raw('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', () => {
  db.destroy().then(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});

export default db;