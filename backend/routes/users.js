const express = require('express');
const { profilePage } = require('../controllers/userController');
const router = express.Router()

router.get('/profile', profilePage);

module.exports = router;