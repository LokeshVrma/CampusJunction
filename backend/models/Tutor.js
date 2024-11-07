const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    availability: { type: String, required: true }, // e.g., 'Monday to Friday, 10 AM - 6 PM'
    hourlyRate: { type: Number, required: true },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    photo_url: { type: String },
    subjects: {type: Array},
    email: {type: String}
});

module.exports = mongoose.model('Tutor', TutorSchema);
