import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProductPage () {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [available, setAvailable] = useState(true); // New field for availability
  const [condition, setCondition] = useState('New'); // New field for condition
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('available', available);
    formData.append('condition', condition);
    formData.append('tags', tags);

    if (image) {
        Array.from(image).forEach((file) => {
            formData.append('images', file);
        });
    }

    try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product created successfully!');
        navigate('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product');
    } finally {
        setIsLoading(false); // Stop loading
    }
};


  return (
    <div className="create-product-page" style={styles.page}>
      <h1 style={styles.name}>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
        </div>
        <div style={styles.formGroup}>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.select}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Price:</label>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Stock:</label>
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Available:</label>
          <select value={available} onChange={(e) => setAvailable(e.target.value === 'true')} required style={styles.select}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Condition:</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required style={styles.select}>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Tags:</label>
          <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value.split(','))} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Image:</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImage(e.target.files)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

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
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  select: {
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

export default CreateProductPage;






