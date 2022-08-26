const router = require('express').Router();

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  // createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  // validateSignUp,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validators');

router.get('/users', getAllUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);

// router.post('/users', validateSignUp, createUser);

router.patch('/users/me', validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
