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

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);

// router.post('/users', validateSignUp, createUser);

router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
