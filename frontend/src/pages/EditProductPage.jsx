import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('New');

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`);
        const { name, description, category, price, condition } = response.data;
        setName(name);
        setDescription(description);
        setCategory(category); // This is category ID
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
    const productData = { name, description, category, price, condition };

    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`, productData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Edit Product</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Product Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Price:</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Condition:</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} style={styles.input}>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <button type="submit" style={styles.button}>Update Product</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #f0f4f8, #ffffff)',
    minHeight: 'calc(100vh - 160px)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease-in-out',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    height: '100px',
    resize: 'vertical',
    transition: 'all 0.2s ease-in-out',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default EditProductPage;
