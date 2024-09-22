import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the cart when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCart(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addItemToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/items`,
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/remove`,
        { data: { product_id: productId }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
