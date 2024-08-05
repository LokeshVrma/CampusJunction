const crypto = require('crypto');        // Module for cryptographic functionality
const nodemailer = require('nodemailer'); // Module for sending emails
const jwt = require('jsonwebtoken');     // Module for JSON Web Tokens
const bcrypt = require('bcryptjs');      // Module for hashing passwords
require('dotenv').config();              // Load environment variables from .env file

// In-memory storage for users and tokens (for demonstration purposes)
let users = [];
let tokens = [];

// Configure Nodemailer transporter with service and authentication details
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Handler to register a new user
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a unique verification token
    const token = crypto.randomBytes(32).toString('hex');
    tokens.push({ email, token, password: hashedPassword });

    // Generate verification link
    const verificationLink = `${process.env.NODE_ENV === 'production' ? 'https://campusjunction-backend.up.railway.app' : 'http://localhost:5000'}/api/auth/verify/${token}`;

    // Set up email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Verification',
        text: `Please verify your account by clicking the following link: ${verificationLink}`
    };

    // Send verification email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error sending email', err });
        }
        res.status(200).json({ message: 'Verification mail sent', info });
    });
};

// Handler to verify user account using token
const verifyAccount = (req, res) => {
    const { token } = req.params;
    
    // Find the token record
    const tokenRecord = tokens.find(t => t.token === token);

    if (!tokenRecord) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Simulate saving the user to a database and mark them as verified
    users.push({ email: tokenRecord.email, password: tokenRecord.password, verified: true });

    // Remove the token after verification
    tokens = tokens.filter(t => t.token !== token);
    res.status(200).json({ message: 'Account verified successfully' });
}

// Handler to log in a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find the user with the given email and ensure they are verified
    const user = users.find(u => u.email === email && u.verified);

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or email not verified' });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT for the logged-in user
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
};

module.exports = { registerUser, verifyAccount, loginUser };
