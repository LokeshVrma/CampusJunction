const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
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
  variants: [
    {
      color: String,
      size: String,
      price: Number,
      stock: Number
    }
  ],
  ratings: {
    average: Number,
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        comment: String,
        rating: Number,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  }
});

module.exports = mongoose.model('Product', productSchema);
