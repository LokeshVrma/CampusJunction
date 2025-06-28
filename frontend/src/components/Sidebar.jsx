import React from 'react';
import ProductCard from './ProductCard';

function Sidebar({ setCategoryFilter, categoryFilter, allProducts }) {
  const categories = ['Book', 'Electronics', 'Furniture', 'Clothing', 'Other'];

  const styles = {
    aside: {
      background: '#fffdf9',
      padding: '2rem 1.5rem',
      width: '240px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      fontFamily: "'Segoe UI', sans-serif",
      border: '1px solid #f0eae2'
    },
    h2: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      color: '#333',
      borderBottom: '1px solid #eee',
      paddingBottom: '0.5rem'
    },
    ul: {
      listStyleType: 'none',
      padding: 0
    },
    li: {
      margin: '0.8rem 0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '0.5rem 0.7rem',
      borderRadius: '6px',
      color: '#6c5ce7',
    },
    active: {
      backgroundColor: '#e0f8f2',
      color: '#00b894',
      fontWeight: 'bold',
      borderLeft: '4px solid #00b894'
    },
    popular: {
      marginTop: '2.5rem',
      borderTop: '1px solid #eee',
      paddingTop: '1.5rem'
    },
    h3: {
      fontSize: '1.3rem',
      color: '#444',
      marginBottom: '1rem'
    },
    popularItem: {
      backgroundColor: '#fdfdfd',
      padding: '0.8rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      marginBottom: '1rem',
      transition: 'transform 0.2s ease',
    },
    popularTitle: {
      fontWeight: '600',
      color: '#2d3436',
      marginBottom: '0.2rem'
    },
    popularTag: {
      fontSize: '0.75rem',
      color: '#888',
      marginLeft: '4px'
    }
  };

  const popularItems = [...allProducts]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  return (
    <aside style={styles.aside}>
      <h2 style={styles.h2}>Categories</h2>
      <ul style={styles.ul}>
        {categories.map((cat, i) => (
          <li
            key={i}
            style={{
              ...styles.li,
              ...(categoryFilter.toLowerCase() === cat.toLowerCase() ? styles.active : {})
            }}
            onClick={() => setCategoryFilter(cat.toLowerCase())}
          >
            {cat}
          </li>
        ))}
      </ul>

      <div style={styles.popular}>
        <h3 style={styles.h3}>Popular Items</h3>
        {popularItems.map((item, index) => (
          <div key={index} style={styles.popularItem}>
            <p style={styles.popularTitle}>{item.name}</p>
            {item.tags && (
              <p style={styles.popularTag}><em>{item.tags}</em></p>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
