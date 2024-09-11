const mongoose = require('mongoose');

// Define the Order schema
const OrderSchema = new mongoose.Schema({
    // MongoDB generates _id by default
    // You can also manually create an id field if required.
// ref to user_id
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user (if stored in a users collection)
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now // Automatically set to current timestamp
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Example statuses, can be customized
        default: 'Pending'
    },
    total_amount: {
        type: mongoose.Schema.Types.Decimal128, // To store decimal values
        required: true
    },
    order_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }]
}, { timestamps: true });

// Create an Order model based on the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
