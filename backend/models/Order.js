const mongoose = require('mongoose');

// Define the Order schema
const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (seller)
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now // Automatically set to current timestamp
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Example statuses
        default: 'Pending'
    },
    total_amount: {
        type: mongoose.Schema.Types.Decimal128, // To store decimal values
        required: true
    },
    order_items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: mongoose.Schema.Types.Decimal128,
                required: true
            }
        }
    ],
    shipping_address: {
        type: String, // Example: Could be a more complex object
        required: true
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
}, { timestamps: true });

// Create an Order model based on the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
