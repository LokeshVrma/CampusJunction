const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

let users = [];

// Login route
router.post('/login', async function(req, res) {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).send({ error: "Invalid Credentials!!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: "Invalid Credentials!!" });
    }

    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ token });
});

// Register route
router.post('/register', async function(req, res) {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        users.push({ email, password: hashedPassword });
        console.log('User registered:', { email, password: hashedPassword });
        res.status(201).send({ message: "User registered successfully." });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({ error: "Internal server error." });
    }
});

module.exports = router;