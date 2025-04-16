import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // <-- NEW
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const productsPerPage = 6;

  // Fetch products and categories
  useEffect(() => {
    const controller = new AbortController();

    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products`, {
            signal: controller.signal
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`, {
            signal: controller.signal
          })
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching data:', error);
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchAllData();

    return () => controller.abort();
  }, []);

  // Helper: Get category name from ID
  const getCategoryNameById = (id) => {
    if (!categories || categories.length === 0) return '';
    const match = categories.find((cat) => String(cat.id) === String(id));
    return match ? match.name : '';
  };

  // Search, filter logic
  const searchProducts = () => {
    return products.filter((product) => {
      const productCategory = getCategoryNameById(product.category).toLowerCase();
      console.log(productCategory)
      const matchesQuery =
        searchQuery === '' || product.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        (minPrice === '' || product.price >= Number(minPrice)) &&
        (maxPrice === '' || product.price <= Number(maxPrice));

      const matchesCategory =
        categoryFilter === '' || productCategory === categoryFilter.toLowerCase().trim();

      return matchesQuery && matchesPrice && matchesCategory;
    });
  };

  const filteredProducts = categories.length > 0 ? searchProducts() : [];
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ display: 'flex', gap: '1.5rem', padding: '2rem' }}>
        <Sidebar
          setCategoryFilter={setCategoryFilter}
          categoryFilter={categoryFilter}
          allProducts={products}
          categories={categories} // Pass categories to sidebar
          getCategoryNameById={getCategoryNameById} // Optional: to show category names
        />
        <main className="main-content" style={{ flex: 1 }}>
          <SearchBar
            setSearchQuery={setSearchQuery}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <div
            className="product-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
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

          {/* Pagination */}
          <div
            className="pagination"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.6rem 1rem',
                marginRight: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: '#fff'
              }}
            >
              Back
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: '#fff'
              }}
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProductListingPage;
