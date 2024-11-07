import React, { useContext} from 'react';
import '../styles/ProductCard.css';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const renderStars = (ratings) => {
    const maxStars = 5;
    const filledStars = Math.floor(ratings);
    const hasHalfStar = ratings % 1 >= 0.5;

    return (
      <div className="star-rating">
        {[...Array(maxStars)].map((_, index) => {
          if (index < filledStars) {
            return <span key={index} className="star filled">★</span>;
          } else if (index === filledStars && hasHalfStar) {
            return <span key={index} className="star half-filled">★</span>;
          } else {
            return <span key={index} className="star">★</span>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="product-card">
      <a href={`/products/${product._id}`}><img src={product.images[0]['url']} alt={product.images[0]['alt']} /></a>
      <a href={`/products/${product._id}`} className='product-name'><h3>{product.name}</h3></a>
      <p>Price: ₹{product.price}</p>
      <p className={`availability ${product.available ? 'in-stock' : 'out-of-stock'}`}>
        {product.available ? 'In Stock' : 'Out of Stock'}
      </p>
      <div className="rating">
        {renderStars(product.ratings)}
      </div>
      <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      <button className="wishlist-button">Add to Wishlist</button>
    </div>
  );
};

export default ProductCard;
