import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import '../styles/ProductCard.css';

function ProductListingPage() {
  const [searchQuery, setSearchQuery] = useState('');  // For search term
  const [minPrice, setMinPrice] = useState('');        // For minimum price filter
  const [maxPrice, setMaxPrice] = useState('');        // For maximum price filter
  const [currentPage, setCurrentPage] = useState(1);   // Pagination state
  const [products, setProducts] = useState([]);        // All products fetched from API
  const [loading, setLoading] = useState(false);       // Loading state
  const [error, setError] = useState(false);           // Error state
  const productsPerPage = 6;                           // Products per page

  // Fetch all products on initial page load
  useEffect(() => {
    const controller = new AbortController();
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products`,
          { signal: controller.signal }
        );

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled', error.message);
        } else {
          setError(true);
          console.error('Error fetching products:', error);  // Log error details
        }
        setLoading(false);
      }
    };

    fetchAllProducts();

    return () => {
      controller.abort(); // Cleanup
    };
  }, []);

  // Filtering logic
  const searchProducts = () => {
    return products.filter((product) => {
      const matchesQuery = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        (minPrice === '' || product.price >= minPrice) &&
        (maxPrice === '' || product.price <= maxPrice);
      return matchesQuery && matchesPrice;
    });
  };

  const filteredProducts = searchProducts();

  // Pagination helper functions
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        {/* Search and Filter Bar */}
        <SearchBar
          setSearchQuery={setSearchQuery}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Product Grid */}
        <div className="product-grid">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading products.</p>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Back
          </button>
          <button
            className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProductListingPage;
