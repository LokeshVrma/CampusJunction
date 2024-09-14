const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getProductById, updateProduct, deleteProduct, searchProducts, filterProducts } = require('../controllers/marketplaceController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/products', authenticateToken, addProduct);
router.get('/products/filter', authenticateToken, filterProducts)
router.get('/products/search', authenticateToken, searchProducts);
router.get('/products/:id', authenticateToken, getProductById);
router.get('/products', authenticateToken, getProduct);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

module.exports = router;
