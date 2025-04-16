import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShoppingCart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../components/ConfirmationModal';
import CheckoutModal from '../components/CheckoutModal';

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
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
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
        const total = cartItems.reduce((acc, item) => acc + parseFloat(item?.price?.$numberDecimal) * item.quantity, 0);
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

    const handleCheckout = () => {
        if (!user) {
            setAlertMessage("You need to be logged in to checkout.");
            setShowAlertModal(true);
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
            setShowAlertModal(true);
        } catch (error) {
            console.error("Error during checkout:", error);
            setAlertMessage("Checkout failed. Please try again.");
            setShowAlertModal(true);
        }
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: '#222', marginBottom: '1.5rem' }}>🛒 Your Cart</h2>

                {(userLoading || cartLoading || loading) ? (
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                ) : cartItems.length > 0 ? (
                    <>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {cartItems.map(item => (
                                <div key={item._id} style={{
                                    background: '#fff',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>{products[item.product_id]?.name || "Product not found"}</h3>
                                        <p style={{ margin: '4px 0' }}>Price: ₹{parseFloat(item?.price?.$numberDecimal).toFixed(2)}</p>
                                        <p style={{ margin: '4px 0' }}>Quantity: {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => handleOpenRemoveModal(item.product_id)}
                                        style={{
                                            backgroundColor: '#ff5c5c',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            color: 'white',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.3s'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '6px' }} />
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            background: '#fff',
                            marginTop: '2rem',
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                        }}>
                            <h3 style={{ marginBottom: '1rem' }}>📦 Shipping Address</h3>
                            <form style={{ display: 'grid', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="House no, Apartment, Colony"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    style={inputStyle}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                    Please ensure your address is correct to avoid delivery issues.
                                </span>
                            </form>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '2rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
                            <div>
                                <button onClick={handleClearCart} style={secondaryBtnStyle}>
                                    <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '6px' }} />
                                    Clear Cart
                                </button>
                                <button onClick={handleCheckout} style={primaryBtnStyle}>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ marginRight: '6px' }} />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
                    }}>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added anything yet.</p>
                        <button
                            onClick={() => navigate('/products')}
                            style={primaryBtnStyle}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '6px' }} />
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>

            {showRemoveModal && (
                <ConfirmationModal
                    message="Are you sure you want to remove this item from your cart?"
                    onConfirm={handleConfirmRemove}
                    onCancel={() => setShowRemoveModal(false)}
                    onClose={() => setShowRemoveModal(false)}
                />
            )}

            {showClearModal && (
                <ConfirmationModal
                    message="Are you sure you want to clear your cart?"
                    onConfirm={handleConfirmClearCart}
                    onCancel={() => setShowClearModal(false)}
                    onClose={() => setShowClearModal(false)}
                />
            )}

            {showCheckoutModal && (
                <CheckoutModal
                    isOpen={showCheckoutModal}
                    onClose={() => setShowCheckoutModal(false)}
                    onConfirm={confirmCheckout}
                    onCancel={() => setShowCheckoutModal(false)}
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

// === Styles ===
const inputStyle = {
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
};

const primaryBtnStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    marginLeft: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease'
};

const secondaryBtnStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease'
};

export default CartPage;
