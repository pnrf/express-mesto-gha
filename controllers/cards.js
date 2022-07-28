const Cards = require('../models/card');

const SUCСESSFUL_REQUEST = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getAllCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(SUCСESSFUL_REQUEST).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при создании карточки -- ${err.name}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Cards.findByIdAndRemove(cardId)
    .then((card) => res.status(SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные для удаления карточки -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => res.status(SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные для постановки лайка -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => res.status(SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные для снятия лайка  -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
