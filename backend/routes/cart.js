const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, removeItemFromCart, clearCart } = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('', authenticateToken, getCart);
router.post('/items', authenticateToken, addItemToCart);
router.delete('/remove', authenticateToken, removeItemFromCart)
router.delete('/clear', authenticateToken, clearCart)

module.exports = router