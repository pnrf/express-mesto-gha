const User = require('../models/user');

const SUCСESSFUL_REQUEST = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCСESSFUL_REQUEST).send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.status(SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при создании пользователя -- ${err.name} -- ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => res.status(SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении профиля -- ${err.name} -- ${err.message}` });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).then((user) => res.status(SUCСESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении аватара -- ${err.name} -- ${err.message}` });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
