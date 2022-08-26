const { NODE_ENV, JWT_SECRET } = process.env;

const jwtAuth = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
};

module.exports = jwtAuth;
