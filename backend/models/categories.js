const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
    // Automatically created by MongoDB
    // _id: mongoose.Schema.Types.ObjectId,

    category_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true });

// Create a Category model based on the schema
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
