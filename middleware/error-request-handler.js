/* eslint-disable no-unused-vars */
const { failure } = require('../utils/log');
const {
  env: { isProd },
} = require('../config/env');

/**
 * Handle express errors base on origin, environment and status code
 * @override express default error handler
 * @type {import('express').ErrorRequestHandler}
 */
module.exports = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // log the error if it is unexpected
  if (!err.isPlaned) failure(err);

  if (isProd)
    res
      .status(err.statusCode)
      .send({ status: err.status, message: err.isPlaned ? err.message : 'internal server error' });
  else
    res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
      stack: err.stack.split('\n').map(line => line.trim()),
    });
};
