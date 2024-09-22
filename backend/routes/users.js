const express = require('express');
const { getUserInfo } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', authenticateToken, getUserInfo);

module.exports = router;