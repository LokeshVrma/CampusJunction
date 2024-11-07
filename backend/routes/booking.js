const express = require('express');
const router = express.Router();
const { createBooking, updateBookingStatus} = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);
router.put('/status', updateBookingStatus)

module.exports = router;
