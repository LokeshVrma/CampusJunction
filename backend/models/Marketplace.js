const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Product Schema
const productSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    seller_id: {
        type: Schema.Types.ObjectId, // Assuming the seller is a separate document in a 'sellers' collection
        ref: 'Seller',
        required: true
    },
    images: {
        type: [String], // Array of image URLs/paths
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create and export the model
module.exports = mongoose.model('Product', productSchema);
