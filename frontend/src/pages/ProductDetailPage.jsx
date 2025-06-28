import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailPage.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("https://via.placeholder.com/400?text=Image+1");
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.images[0]?.url || "https://via.placeholder.com/400?text=No+Image");
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleRating = (newRating) => {
    setUserRating(newRating);
  };

  const submitReview = () => {
    if (review.trim()) {
      setReviews([...reviews, { rating: userRating, comment: review }]);
      setReview("");
      setUserRating(0);
    }
  };

  const handleEditProduct = () => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="productLayout">
          <div className="productImages">
            <div className="thumbnails">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(image.url)}
                  className="thumbnailImage"
                />
              ))}
            </div>
            <div className="mainImage">
              <img src={mainImage} alt="Main Product" className="mainImageDisplay" />
            </div>
          </div>

          {product && (
            <div className="productInfo">
              <h1 className="productTitle">{product.name}</h1>

              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < product.rating ? "filled-star" : "empty-star"}>★</span>
                ))}
              </div>

              <p className="productDescription">{product.description}</p>
              <p className="productPrice">₹ {product.price}</p>
              <p className="productSeller">Sold by: <strong>{product.seller?.name || "Unknown Seller"}</strong></p>

              <div className="actionButtons">
                <button className="addToCart" >Add to Cart</button>
                <button className="buyNow">Buy Now</button>
              </div>
              
              <div className="userRating">
                <h3>Rate this Product:</h3>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={index < userRating ? "filled-star clickable" : "empty-star clickable"}
                    onClick={() => handleRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <button className="editButton" onClick={handleEditProduct}>
                ✏️ Edit Product
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
