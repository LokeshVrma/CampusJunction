import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShoppingCart, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Added icon
import ConfirmationModal from '../components/ConfirmationModal';
import CheckoutModal from '../components/CheckoutModal';
import '../styles/cartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart, loading: cartLoading } = useContext(CartContext);
    const { user, loading: userLoading } = useContext(UserContext);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false); // State for alert modal
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products`);
            const productsData = response.data.reduce((acc, product) => {
                acc[product._id] = product;
                return acc;
            }, {});
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.$numberDecimal) * item.quantity, 0);
        setGrandTotal(total);
    }, [cartItems]);

    const handleOpenRemoveModal = (productId) => {
        setItemToRemove(productId);
        setShowRemoveModal(true);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove);
        }
        setShowRemoveModal(false);
    };

    const handleClearCart = () => {
        setShowClearModal(true);
    };

    const handleConfirmClearCart = () => {
        clearCart();
        setShowClearModal(false);
    };

    // Checkout Functionality
    const handleCheckout = () => {
        if (!user) {
            setAlertMessage("You need to be logged in to checkout."); // Set alert message
            setShowAlertModal(true); // Show alert modal
            return;
        }
        setShowCheckoutModal(true);
    };

    const confirmCheckout = async () => {
        const fullAddress = `${address}, ${city}, ${zip}`;
        const checkoutData = cartItems.map(item => ({
            product_id: item.product_id,
            seller_id: item.seller_id,
            quantity: item.quantity,
            price: item.price,
        }));

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/checkout`,
                { cartItems: checkoutData, total: grandTotal, shippingAddress: fullAddress },
                { withCredentials: true }
            );

            setAlertMessage("Checkout successful! Order ID: " + response.data.orderIds.join(", "));
            clearCart();
            setShowCheckoutModal(false);
            setShowAlertModal(true); // Show alert modal
        } catch (error) {
            console.error("Error during checkout:", error);
            setAlertMessage("Checkout failed. Please try again.");
            setShowAlertModal(true); // Show alert modal
        }
    };

    return (
        <div>
            <Navbar />
            <div className="cart-page">
                <div className="cart-container">
                    <h2>Your Cart</h2>
                    {userLoading || cartLoading || loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {cartItems.length > 0 ? (
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="cart-item">
                                            <h3 className="cart-item-name">{products[item.product_id]?.name || "Product not found"}</h3>
                                            <p className="cart-item-price">Price: ₹{parseFloat(item.price.$numberDecimal).toFixed(2)}</p>
                                            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                            <button className="remove-item-button" onClick={() => handleOpenRemoveModal(item.product_id)}>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '5px' }} />
                                                Remove Item
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-cart-message">
                                    <h3>Your cart is empty</h3>
                                    <p>Looks like you haven't added anything to your cart yet.</p>
                                    <p>Start shopping now and find amazing products!</p>
                                    <button className="start-shopping-button" onClick={() => navigate('/products')}>
                                        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="grand-total">
                    <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
                </div>

                <div className="shipping-address-container">
                    <h2 className="shipping-address-title">Shipping Address</h2>
                    <form className="shipping-address-form">
                        <label className="shipping-address-label" htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            className="shipping-address-input" 
                            placeholder="House no, Apartment, Colony"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                        />

                        <label className="shipping-address-label" htmlFor="city">City</label>
                        <input 
                            type="text" 
                            id="city" 
                            className="shipping-address-input" 
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                        />

                        <label className="shipping-address-label" htmlFor="zip">Zip Code</label>
                        <input 
                            type="text" 
                            id="zip" 
                            className="shipping-address-input" 
                            placeholder="123456"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)} 
                        />

                        <span className="shipping-address-note">Please ensure your address is correct to avoid delivery issues.</span>
                    </form>
                </div>

                <div className="button-container">
                    <button className="clear-cart-button" onClick={handleClearCart}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '5px' }} />
                        Clear Cart
                    </button>
                    <button className="checkout-button" onClick={handleCheckout}>
                        <FontAwesomeIcon icon={faChevronRight} style={{ marginRight: '5px' }} />
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {showRemoveModal && (
                <ConfirmationModal 
                    message="Are you sure you want to remove this item from your cart?"
                    onConfirm={handleConfirmRemove}
                    onCancel={() => setShowRemoveModal(false)}
                />
            )}

            {showClearModal && (
                <ConfirmationModal 
                    message="Are you sure you want to clear your cart?"
                    onConfirm={handleConfirmClearCart}
                    onCancel={() => setShowClearModal(false)}
                />
            )}

            {showCheckoutModal && (
                <CheckoutModal 
                    isOpen={showCheckoutModal} 
                    onClose={() => setShowCheckoutModal(false)} 
                    onConfirm={confirmCheckout} 
                />
            )}

            {showAlertModal && (
                <ConfirmationModal
                    message={alertMessage} 
                    onClose={() => setShowAlertModal(false)} 
                />
            )}

            <Footer />
        </div>
    );
};

export default CartPage;
