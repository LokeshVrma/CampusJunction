const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },  // Link to categories.js
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  available: { type: Boolean, default: true },
  tags: [String],
  images: [
    {
      url: String,
      alt: String
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ratings: { type: Number },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Link to users.js (seller)
});

module.exports = mongoose.model('Product', productSchema);
