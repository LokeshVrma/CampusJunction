const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/user'));

app.get('/', (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
});