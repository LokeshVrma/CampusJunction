import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('New');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`);
        const { name, description, category, price, condition } = response.data;
        setName(name);
        setDescription(description);
        setCategory(category);
        setPrice(price);
        setCondition(condition);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data as a JSON object (no need for FormData if no files)
    const productData = {
      name,
      description,
      category,
      price,
      condition,
    };
  
    try {
      // Send the request as application/json
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`, productData, {
        headers: {
          'Content-Type': 'application/json', // Set to application/json
        },
      });
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };
  

  return (
    <div className="edit-product-page" style={styles.page}>
      <h1 style={styles.name}>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Current name"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Current Description"
            style={{ ...styles.input, height: '100px' }}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Current Category"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Current Price"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Condition:</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={styles.input}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Update Product</button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  name: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditProductPage;
