const { Sequelize } = require('sequelize');
const {
  env,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = require('./env');
const { query, success, failure } = require('../utils/log');

const dbCredentials = {
  database: env.isTest ? `${DATABASE_NAME}-test` : DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
};

/**
 * @type {import('sequelize').Options}
 */
const dbOptions = {
  dialect: 'postgres',
  host: DATABASE_HOST,
};

// sequelize client
const sequelize = new Sequelize(...Object.values(dbCredentials), {
  ...dbOptions,
  logging: env.isDev ? query : false,
  define: {
    underscored: true,
  },
});

/**
 * initialize and validate sequelize connection
 */
exports.validate = async () => {
  try {
    await sequelize.authenticate();
    success('database connection established');
  } catch (err) {
    failure('database connection failed\n', err);
    process.exit(1);
  }
};

// sequelize cli configuration
const dbCliConfig = {
  ...dbCredentials,
  ...dbOptions,
};

exports.development = dbCliConfig;
exports.test = dbCliConfig;
exports.production = dbCliConfig;
exports.sequelize = sequelize;
