const cors = require('cors');

const CORS_OPTIONS = {
  exposedHeaders: ['Content-Type', 'Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

/**
 *
 * @param {import('express').Application} app
 */
exports.setupCors = app => {
  app.use(cors(CORS_OPTIONS)); // allow cors origin
  app.options('*', cors(CORS_OPTIONS)); // allow cors origin for option request
};
