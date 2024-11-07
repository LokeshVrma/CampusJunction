const crypto = require('crypto');        // Module for cryptographic functionality
const jwt = require('jsonwebtoken');     // Module for JSON Web Tokens
const bcrypt = require('bcryptjs');      // Module for hashing passwords
const User = require('../models/User'); // Module for User model
require('dotenv').config();              // Load environment variables from .env file
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const registerUser = async (req, res) => {
  const { email, name, password, phone_num, college_uid, college_name, address } = req.body;
  const files = req.files; // Get uploaded files

  if (!email || !name || !password) {
      return res.status(400).json({ message: 'Email, Password, and Name are required.' });
  }

  // Handle file uploads
  if (!files || !files.photo_url || !files.college_uid_photo_url) {
      return res.status(400).json({ message: 'Both Photo and College UID Photo are required.' });
  }

  try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Access the uploaded files
      const photoFile = files.photo_url[0]; // Get the first file from photo_url
      const collegeUidFile = files.college_uid_photo_url[0]; // Get the first file from college_uid_photo_url

      // Upload images to Cloudinary
      const photoUpload = await cloudinary.uploader.upload(photoFile.path);
      const collegeUidUpload = await cloudinary.uploader.upload(collegeUidFile.path);

      // Delete local files after uploading to Cloudinary
      [photoFile.path, collegeUidFile.path].forEach(file => {
          fs.unlink(file, (err) => {
              if (err) console.error('Error deleting local file:', err);
          });
      });

      // Create a new User object
      const user = new User({
          email,
          name,
          password: hashedPassword,
          photo_url: photoUpload.secure_url,
          phone_num,
          college_uid,
          college_uid_photo_url: collegeUidUpload.secure_url,
          college_name,
          address,
          role: 'buyer' // Default role
      });

      await user.save();
      res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Error creating user', err: err.message });
  }
};


// Function to update a user's role to 'seller'
const updateUserRoleToSeller = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.role = 'seller';
      await user.save();
      return user;
    } catch (err) {
      throw err;
    }
};

// Handler to log in a user
const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user with the given email and ensure they are verified
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: 'Invalid email or email not verified' });
      }

      // Compare provided password with stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate a JWT for the logged-in user
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set the JWT as a cookie
      res.cookie('token', token, {
          httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === 'production', // Use 'true' for HTTPS in production
          maxAge: 3600000 // 1 hour in milliseconds
      });

      res.status(200).json({ message: 'Login successful', token:token });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
      // Clear the cookie
      res.cookie('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: new Date(0) // Set the expiration date to the past
      });

      res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { registerUser, updateUserRoleToSeller,loginUser, logoutUser };
