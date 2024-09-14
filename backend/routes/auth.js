const express = require('express');
const { registerUser, updateUserRoleToSeller, loginUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-role', updateUserRoleToSeller);
router.post('/logout', logoutUser);

module.exports = router;
