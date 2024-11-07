const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    items: [{
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
        },
        seller_id: { // Add seller ID here
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model (Seller)
            required: true
        }
    }],
    total_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
