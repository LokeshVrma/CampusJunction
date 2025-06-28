import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/CreateProductPage.css'

function CreateProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [available, setAvailable] = useState(true);
  const [condition, setCondition] = useState('New');
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
    setIsLoading(true);

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
  //  Fetch token from cookies
       
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products`, formData, {
        withCredentials: true
      });
      alert('Product created successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="outer-wrapper">
    <Navbar />
    <div className="create-product-page">
     
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="full-width">
          <label>Description:</label>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Available:</label>
          <select value={available} onChange={(e) => setAvailable(e.target.value === 'true')} required>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Condition:</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label>Tags:</label>
          <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value.split(','))} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImage(e.target.files)} />
        </div>
        <div className="full-width">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Product'}
        </button>
        </div>
      </form>
   
    </div>
    <Footer />
    </div>
  );
}

export default CreateProductPage;