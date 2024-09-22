require('dotenv').config();
const User = require('../models/User');

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

module.exports = { getUserInfo };