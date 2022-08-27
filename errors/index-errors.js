const AuthError = require('./auth-error');
const BadRequestError = require('./bad-request-error');
const ConflictError = require('./conflict-error');
const ForbiddenError = require('./forbidden-error');
const NotFoundError = require('./not-found-error');
const ServerError = require('./server-error');

module.exports = {
  AuthError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
};
