const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

const validateUrl = (url) => {
  const result = validator.isURL(url);
  if (result) {
    return url;
  }
  throw new BadRequestError('Невалидный URL');
};

const isRegex = (avatar) => {
  // eslint-disable-next-line no-useless-escape
  const regex = '/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi';
  if (regex) {
    return avatar;
  }
  throw new Error('Невалидный URL, не соответствует regex');
};

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isRegex),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserId,
  validateSignUp,
  validateSignIn,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardCreation,
  validateCardId,
};
