// In models/LostItem.js
const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
    foundBy: { type: String, required: true }, 
});

module.exports = mongoose.model('LostItem', lostItemSchema);
