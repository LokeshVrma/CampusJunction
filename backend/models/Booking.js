const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, // You can also use Date if you want to store the exact time
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'canceled'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
