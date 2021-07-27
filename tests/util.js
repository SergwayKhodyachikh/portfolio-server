const supertest = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/database');

const { error } = console;

const establishConnection = async () => {
  try {
    return supertest(await app);
  } catch (ex) {
    error(ex);
    process.exit(1);
  }
};

const terminateConnection = async () => {
  try {
    await sequelize.close();
    (await app).close();
  } catch (ex) {
    error(ex);
  }
};

module.exports = { establishConnection, terminateConnection };
