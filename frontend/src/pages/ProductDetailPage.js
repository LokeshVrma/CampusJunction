import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/ProductDetailPage.css"; // Importing the external CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetailPage() {
  // State to track the main image
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("https://via.placeholder.com/400?text=Image+1");
  const [rating, setRating] = useState(4); // Product rating (out of 5 stars)
  const [userRating, setUserRating] = useState(0); // User's selected rating
  const [review, setReview] = useState(""); // User's review
  const [reviews, setReviews] = useState([]); // List of customer reviews

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/`); 
        setProduct(response.data);
        setMainImage(response.data.images[0]); 
        setReviews(response.data.reviews);
      }catch(error) {
        console.error('Error fetching product details', error);
      }
      };
      fetchProductDetails();
    },
  []);
  

  // Function to handle star rating click
  const handleRating = (newRating) => {
    setUserRating(newRating);
  };

  // Function to handle review submission
  const submitReview = () => {
    if (review.trim()) {
      setReviews([...reviews, { rating: userRating, comment: review }]);
      setReview("");
      setUserRating(0);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      {/* Product Images and Info Section */}
      <div className="productLayout">
        <div className="productImages">
          <div className="thumbnails">
          {product.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(imageUrl)}
              className="thumbnailImage"
            />
          ))}
          </div>
          <div className="mainImage">
            <img src={mainImage} alt="Main Product" className="mainImageDisplay" />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="productInfo">
          <h1 className="productTitle">{product.title}</h1>
          
          {/* Static Star Rating */} 
          <div className="rating">
            {[...Array(5)].map((star, index) => (
              <span key={index} className={index < product.rating ? "filled-star" : "empty-star"}>★</span>
            ))}
          </div>

          <p className="productDescription">{product.description} </p>
          <p className="productPrice">{product.price}</p>
          <p className="productSeller">Sold by: <strong>{product.seller}</strong></p>
          
          <div className="actionButtons">
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
          </div>

          {/* User Rating Input */}
          <div className="userRating">
            <h3>Rate this Product:</h3>
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={index < userRating ? "filled-star" : "empty-star"}
                onClick={() => handleRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetailPage;
