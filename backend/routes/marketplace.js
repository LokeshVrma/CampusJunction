const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getProductById, updateProduct, deleteProduct, searchProducts, filterProducts } = require('../controllers/marketplaceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where images are temporarily stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append file extension
    }
});

// Create multer instance
const upload = multer({ storage });

router.post('/products', upload.array('images'), authenticateToken,addProduct);
router.get('/products/filter', filterProducts)
router.get('/products/search', searchProducts);
router.get('/products/:id',  getProductById);
router.get('/products',  getProduct);
router.put('/products/:id',  updateProduct);
router.delete('/products/:id',  deleteProduct);

module.exports = router;
