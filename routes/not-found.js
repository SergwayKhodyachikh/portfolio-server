const ServerError = require('../utils/server-error');

/**
 *
 * @type {import('express').RequestHandler}
 */
module.exports = (req, res, next) => {
  const url = /\?/.test(req.originalUrl) ? req.originalUrl.split('?')[0] : req.originalUrl;

  next(new ServerError(`can't find the path: ${url} on this server`, 404));
};
