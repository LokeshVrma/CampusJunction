import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeItemFromCart, loading } = useContext(CartContext);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Go back to products</Link>
      </div>
    );
  }

  return (
    <div style={styles.cartPage}>
      <h1>Your Cart</h1>
      <ul style={styles.cartItems}>
        {cart.items.map((item) => (
          <li key={item.product_id} style={styles.cartItem}>
            <div>
              <h3>{item.product_id.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button onClick={() => removeItemFromCart(item.product_id)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Total: ${cart.total_amount}</h2>
      <button style={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
}

const styles = {
  cartPage: {
    padding: '20px',
  },
  cartItems: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  removeButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  checkoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default CartPage;
