import React, { useState } from 'react';

function SearchBar({ setSearchQuery, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '1.5rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    input: {
      padding: '0.8rem',
      maxWidth: '250px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '1rem'
    },
    button: {
      padding: '0.8rem 1.2rem',
      backgroundColor: '#6c5ce7',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 500
    },
    priceInput: {
      padding: '0.6rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
      width: '100px'
    },
    priceContainer: {
      display: 'flex',
      gap: '0.5rem'
    }
  };

  return (
    <header style={styles.header}>
      <input
        type="text"
        style={styles.input}
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
      <div style={styles.priceContainer}>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={styles.priceInput}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.priceInput}
        />
      </div>
    </header>
  );
}

export default SearchBar;
