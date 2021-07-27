const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ServerError = require('../utils/server-error');
const { SECRET } = require('../config/env');

const AUTH_ERROR_PROPS = ['invalid credentials', 401];

const verifyJWT = promisify(jwt.verify);
const isBearerAuth = token => /^Bearer /.test(token);

/**
 * @type {import('express').RequestHandler}
 */
module.exports = async (req, res, next) => {
  try {
    // check if the request was already authenticated by PassportJS
    if (req.user) return next();

    const authHeader = req.headers.authorization;
    let token;

    // check if the header contain authorization header that contain bearer token
    if (authHeader && isBearerAuth(authHeader)) [, token] = authHeader.split(' ');
    if (!token) throw new ServerError(...AUTH_ERROR_PROPS);

    // verify jwt token and user
    const decode = await verifyJWT(token, SECRET).catch(() => {
      throw new ServerError(...AUTH_ERROR_PROPS);
    });
    const user = await User.findByPk(decode.sub);
    if (!user) throw new ServerError(...AUTH_ERROR_PROPS);

    // check if the token was generated after the last time the user details was updated
    if (user.authUserChanged(decode.iat)) throw new ServerError(...AUTH_ERROR_PROPS);

    // grant access to protected route
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};
