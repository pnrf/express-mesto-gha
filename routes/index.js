const express = require('express');

const auth = require('../middlewares/auth');
const userRouters = require('./users');
const cardRouters = require('./cards');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');
const { createUser, login } = require('../controllers/users');

const { NotFoundError } = require('../errors/index-errors');

const router = express.Router();

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;