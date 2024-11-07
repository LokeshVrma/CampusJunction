const express = require('express');
const { getUserInfo, getUserBookings } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getUserInfo);
router.get('/bookings', authenticateToken, getUserBookings); // Protect this route

module.exports = router;
