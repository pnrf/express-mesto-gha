const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCreationCard,
  validateCardId,
} = require('../middlewares/validators');

router.get('/cards', getAllCards);
router.post('/cards', validateCreationCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCardById);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
