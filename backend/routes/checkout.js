const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Assuming you have a Cart model

router.post('/', authenticateToken, async (req, res) => {
    const { cartItems, total, shippingAddress } = req.body;

    if (!cartItems || cartItems.length === 0 || total <= 0) {
        return res.status(400).json({ message: 'Invalid cart items or total amount.' });
    }

    try {
        // Ensure req.user is populated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User ID is required.' });
        }

        const sellerIds = [...new Set(cartItems.map(item => item.seller_id))];

        console.log('User ID:', req.user.userId);
        console.log('Cart Items:', cartItems);
        console.log('Seller IDs:', sellerIds);

        const orders = await Promise.all(sellerIds.map(async (sellerId) => {
            const itemsForSeller = cartItems.filter(item => item.seller_id === sellerId);
            const order = new Order({
                user_id: req.user.userId,
                seller_id: sellerId,
                order_items: itemsForSeller.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total_amount: total,
                shipping_address: shippingAddress,
                payment_status: 'Pending',
            });

            return await order.save();
        }));

        await Cart.deleteMany({ userId: req.user.userId });

        return res.status(200).json({ orderIds: orders.map(order => order._id) });
    } catch (error) {
        console.error('Error creating orders:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
