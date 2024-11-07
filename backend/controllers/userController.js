require('dotenv').config();
const User = require('../models/User');
const Booking = require('../models/Booking');

const getUserInfo = async (req, res) => {
    try {
        // Find the user by their ID (set in req.user by the middleware)
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Return the user info
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Get bookings for a user
const getUserBookings = async (req, res) => {
    const userId = req.user.userId; // Get the user ID from the authenticated request

    console.log('Fetching bookings for user ID:', userId); // Debug log

    try {
        const bookings = await Booking.find({ userId }).populate('tutorId', 'name email').populate('userId');


        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this user.' });
        }

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
};

module.exports = { getUserInfo, getUserBookings };