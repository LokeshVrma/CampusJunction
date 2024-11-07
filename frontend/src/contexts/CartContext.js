import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch token from localStorage
    const token = localStorage.getItem('token');

    // Configure axios instance with base settings
    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/cart`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // For cookie-based sessions if used
    });

    // Fetch the cart from the server
    const fetchCart = async () => {
      try {
          setLoading(true);
          const response = await axiosInstance.get('/');
          // Access the first item in the response array
          const cartData = response.data[0]; // Assuming there’s always one cart object
          setCartItems(cartData.items || []); // Set cartItems to the items array
      } catch (error) {
          console.error("Error fetching cart:", error);
      } finally {
          setLoading(false);
      }
    };
  

    // Add item to cart
    const addToCart = async (product_id, quantity = 1) => {
      try {
          const response = await axiosInstance.post('/items', { product_id, quantity });
          // Directly update cartItems instead of relying solely on server response
          setCartItems((prevItems) => {
              const existingItem = prevItems.find(item => item.product_id === product_id);
              if (existingItem) {
                  return prevItems.map(item =>
                      item.product_id === product_id
                          ? { ...item, quantity: item.quantity + quantity }
                          : item
                  );
              }
              return [...prevItems, { product_id, quantity }];
          });
      } catch (error) {
          console.error("Error adding item to cart:", error);
      }
    };

    // Remove item from cart
    const removeFromCart = async (product_id) => {
      try {
          await axiosInstance.delete('/remove', { data: { product_id } });
          // Update cartItems by filtering out the removed item
          setCartItems((prevItems) => prevItems.filter(item => item.product_id !== product_id));
      } catch (error) {
          console.error("Error removing item from cart:", error);
      }
    };


    // Clear the cart
    const clearCart = async () => {
      try {
          await axiosInstance.delete('/clear'); // Assuming this endpoint clears the cart on the server
          setCartItems([]); // Clear local cart state
      } catch (error) {
          console.error("Error clearing cart:", error);
      }
    };


    // Initial cart fetch on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};
