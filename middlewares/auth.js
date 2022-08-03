const jwt = require('jsonwebtoken');
// const httpStatusCodes = require('../utils/httpStatusCodes');
const AuthError = require('../errors/auth-error');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Требуется авторизация'));
    // res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'Требуется авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return new AuthError('Требуется авторизация');
    // res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'Требуется авторизация' });
  }

  req.user = payload;

  next();
};
