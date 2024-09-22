import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { UserContext } from '../contexts/UserContext';

function HomePage() {
  const [message, setMessage] = useState('');
  const { user, loading } = useContext(UserContext);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`,{
          withCredentials: true,
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    
    <div>
      <Navbar/>
      <h2>Home Page</h2>
      <p>
        {user?.name}
        {user?.email}
      </p>
      <Footer />
    </div>
  );
}

export default HomePage;
