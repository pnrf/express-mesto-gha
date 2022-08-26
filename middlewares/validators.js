const { celebrate, Joi } = require('celebrate');
// const isUrl = require('validator/lib/isURL');
const validator = require('validator');

const isUrl = (link) => {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error('Невалидный URL');
};

const isRegex = (avatar) => {
  // eslint-disable-next-line no-useless-escape
  const regex = '/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi';
  if (regex) {
    return avatar;
  }
  throw new Error('Невалидный URL, не соответствует regex');
};

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
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
    link: Joi.string().required().custom(isUrl),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardCreation,
  validateCardId,
};
