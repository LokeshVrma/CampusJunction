const mongoose = require('mongoose');

// Define the OrderItem schema
const OrderItemSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to Product
    quantity: { type: Number, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true }
}, { timestamps: true });

// Create the OrderItem model
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

module.exports = OrderItem;
