const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { JWT_SECRET } = require('../utils/jwtKey');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthError('Требуется авторизация');
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }

  req.user = payload;

  next();
};
