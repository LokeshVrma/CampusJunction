require('dotenv').config();
const Cart = require('../models/Cart');
const Product = require('../models/product')

// Helper function to calculate total amount
const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        if(!userId) {
            res.status(401).json({ message: 'Unauthorized: Please sign in' })
        }

        const cart = await Cart.find({ user_id: userId })

        res.status(200).json(cart);
    }
    catch(error) {
        res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Please sign in' });
        }

        const { product_id, quantity } = req.body;

        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const price = product.price;

        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            cart = new Cart({
                user_id: userId,
                items: [{ product_id, quantity, price, seller_id: product.seller }], // Include seller_id here
                total_amount: price * quantity
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id.toString());
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].price = price;
            } else {
                cart.items.push({ product_id, quantity, price, seller_id: product.seller }); // Include seller_id here
            }
            cart.total_amount = calculateTotalAmount(cart.items);
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Please sign in' });
        }

        const { product_id } = req.body;

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product_id.toString() !== product_id.toString());
        cart.total_amount = calculateTotalAmount(cart.items);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Clear Cart Functionality
const clearCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Please sign in' });
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear all items from the cart
        cart.items = [];
        cart.total_amount = 0; // Reset the total amount

        await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { getCart, addItemToCart, removeItemFromCart, clearCart }