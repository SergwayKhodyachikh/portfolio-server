require('dotenv').config({ debug: true });
const crypto = require('crypto');

const {
  NODE_ENV,
  DATABASE_HOST,
  PORT = 5000,
  DATABASE_USERNAME = 'postgres',
  DATABASE_PASSWORD = 'postgres',
  DATABASE_NAME = 'haifa-dev',
  SECRET = crypto.randomBytes(32).toString('hex'),
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = process.env;

const env = {
  isTest: NODE_ENV === 'test',
  isProd: NODE_ENV === 'production',
  isDev: !NODE_ENV || NODE_ENV === 'development',
};

const adminCredentials = {
  email: ADMIN_USERNAME,
  password: ADMIN_PASSWORD,
};

module.exports = {
  env,
  PORT,
  DATABASE_HOST,
  adminCredentials,
  SECRET,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
};
