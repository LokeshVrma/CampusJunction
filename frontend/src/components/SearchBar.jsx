import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ setSearchQuery, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue); // Pass the input value to ProductListingPage
  };

  return (
    <header className="header">
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {/* Price Filter */}
      <div className="price-filter">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </header>
  );
}

export default SearchBar;
