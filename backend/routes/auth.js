const express = require('express');
const { registerUser, updateUserRoleToSeller, loginUser, logoutUser } = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path')

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Temporary folder
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique file name
  }
});

const upload = multer({ storage });


router.post('/register', upload.fields([{ name: 'photo_url' }, { name: 'college_uid_photo_url' }]), registerUser);
router.post('/login', loginUser);
router.put('/update-role', updateUserRoleToSeller);
router.post('/logout', logoutUser);

module.exports = router;
