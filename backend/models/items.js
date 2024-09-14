const mongoose = require('mongoose');

// Define the Item schema
const ItemSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    item_desc: { type: String, required: true },
    item_price: { type: mongoose.Schema.Types.Decimal128, required: true },
    item_qty: { type: Number, required: true },
    item_photo_url: { type: String },
    item_video_url: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Seller reference
    created_at: { type: Date, default: Date.now },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

// Create the Item model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
