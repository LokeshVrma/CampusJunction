import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'

function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'CampusJunction';

    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    
    <div>
      <Navbar/>
      <h2>Home Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default HomePage;
