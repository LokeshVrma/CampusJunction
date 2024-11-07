const jwt = require('jsonwebtoken');

// Middleware to verify JWT from cookies and extract user info
const authenticateToken = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token; // Extract the token from the cookies
    if (token == null) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.user = user;

        next();
    });
};

module.exports = { authenticateToken };
