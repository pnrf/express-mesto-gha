const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { jwtKey } = require('../utils/jwtKey');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Требуется авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtKey);
  } catch (err) {
    return next(err);
  }

  req.user = payload;

  return next();
};
