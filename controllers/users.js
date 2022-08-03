const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(users))
    .catch((next) => res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.getCurrentUser = (req, res) => {
  const { } = req.params;

  // здесь будет контроллер для получения информации о текущем пользователе
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при создании пользователя -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (validator.isEmail(email)) {
        res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при создании пользователя -- ${err.name}` });
      } else if (err.code === 11000) {
        res.status(httpStatusCodes.CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });

      res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send({ message: 'Регистрация прошла успешно!' });
    })
    .catch((err) => {
      res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'Требуется авторизация' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(() => new Error('NotFound'))
    .then((user) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении профиля -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(() => new Error('NotFound'))
    .then((user) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении аватара -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
