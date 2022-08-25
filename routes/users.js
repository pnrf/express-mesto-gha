const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validators');

router.get('/users', getAllUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);

router.post('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), createUser);

router.patch('/users/me', validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

router.patch('/users/me', validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
