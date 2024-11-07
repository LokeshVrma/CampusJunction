import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import '../styles/main.css';

function HomePage() {
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
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
      <Navbar />
      <div className="homepage-container">
        
        <section className="welcome-section">
          <h2>Welcome to CampusJunction</h2>
          <p className="welcome-message">
            {user ? `Hey ${user.name}, great to have you back!` : 'Join our campus community to unlock exclusive features!'}
          </p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <h3>Marketplace</h3>
            <p>Buy or sell products easily with other students in a safe environment.</p>
            <Link to="/products" className="feature-link">Browse Products</Link>
          </div>
          <div className="feature-card">
            <h3>Hire a Tutor</h3>
            <p>Connect with experienced tutors to get the support you need.</p>
            <Link to="/hire-tutors" className="feature-link">Explore Tutors</Link>
          </div>
          <div className="feature-card">
            <h3>Lost and Found</h3>
            <p>Lost something? Post it here or search to reunite with lost items.</p>
            <Link to="/lost-and-found" className="feature-link">View Lost & Found</Link>
          </div>
        </section>

        <section className="testimonials-section">
          <h3>What Students Say</h3>
          <div className="testimonial-card">
            <p>“CampusJunction helped me find a great tutor. Highly recommended!”</p>
            <span>- Aman, 2nd Year</span>
          </div>
          <div className="testimonial-card">
            <p>“A fantastic place to buy and sell items securely on campus.”</p>
            <span>- Rohit, 3rd Year</span>
          </div>
          <div className="testimonial-card">
            <p>“The lost and found service is a lifesaver! Got my phone back.”</p>
            <span>- Amit, 1st Year</span>
          </div>
        </section>

        <section className="call-to-action-section">
          <h3>Join the Campus Community Today</h3>
          <p>Explore resources, connect with students, and make the most of your campus life with CampusJunction.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
