const Cards = require('../models/card');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports.getAllCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(cards))
    .catch(() => res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при создании карточки -- ${err.name}` });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Cards.findByIdAndRemove(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные для удаления карточки -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные для постановки лайка -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(httpStatusCodes.SUCСESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные для снятия лайка  -- ${err.name}` });
      } else if (err.message === 'NotFound') {
        res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(httpStatusCodes.SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
