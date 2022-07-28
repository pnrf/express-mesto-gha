const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
