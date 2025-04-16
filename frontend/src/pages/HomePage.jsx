import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/main.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import marketplaceImg from '../assets/images/marketplace.jpg';
import tutorImg from '../assets/images/tutor.jpg';
import lostFoundImg from '../assets/images/lost-found.jpg';

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="campus-homepage">

        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Welcome to <span>Campus Junction</span></h1>
          <p className="hero-subtitle">Empowering student life with smart, simple, and essential services.</p>
          <a href="#features" className="hero-button" data-aos="zoom-in" data-aos-delay="200">Explore Features</a>
        </section>

        {/* Features Section */}
        <h2 className="section-title" data-aos="fade-up">Our Features</h2>
        <section id="features" className="features-grid">
          <div className="feature-item" data-aos="flip-left">
            <img src={marketplaceImg} alt="Marketplace" />
            <h3>Marketplace</h3>
            <p>Buy and sell essentials within your trusted campus circle.</p>
            <button className="feature-btn" onClick={() => window.location.href='/products'}>Learn More</button>
          </div>

          <div className="feature-item" data-aos="flip-left" data-aos-delay="100">
            <img src={tutorImg} alt="Hire a Tutor" />
            <h3>Hire a Tutor</h3>
            <p>Connect with talented tutors or offer your own academic guidance.</p>
            <button className="feature-btn" onClick={() => window.location.href='/hire-tutors'}>Find a Tutor</button>
          </div>

          <div className="feature-item" data-aos="flip-left" data-aos-delay="200">
            <img src={lostFoundImg} alt="Lost & Found" />
            <h3>Lost & Found</h3>
            <p>Lost something? Found something? Reconnect students with their belongings easily.</p>
            <button className="feature-btn" onClick={() => window.location.href='/lost-and-found'}>View Listings</button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="upcoming-events" data-aos="fade-up">
          <h2>Upcoming Events</h2>
          <div className="event-card-wrapper">
            <div className="event-card" data-aos="zoom-in-right">
              <h3>Annual Tech Fest</h3>
              <p><strong>Date:</strong> April 10, 2025</p>
              <p>Exciting workshops, coding battles, and networking with industry leaders.</p>
            </div>
            <div className="event-card" data-aos="zoom-in-left">
              <h3>Campus Sports Meet</h3>
              <p><strong>Date:</strong> May 5, 2025</p>
              <p>Unleash your athletic spirit and compete in high-energy games.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials" data-aos="fade-up">
          <h2>What Students Say</h2>
          <div className="testimonial-wrapper">
            <div className="testimonial-card" data-aos="fade-right">
              <p>"Campus Junction made it super easy to find affordable second-hand books!"</p>
              <strong>- Aditi Sharma</strong>
            </div>
            <div className="testimonial-card" data-aos="fade-up">
              <p>"I found a great tutor for my math classes. Highly recommend!"</p>
              <strong>- Raj Mehta</strong>
            </div>
            <div className="testimonial-card" data-aos="fade-left">
              <p>"The Lost & Found feature helped me recover my lost wallet within a day!"</p>
              <strong>- Priya Verma</strong>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="cta-section" data-aos="zoom-in">
          <h2>Join Campus Junction Today</h2>
          <p>Take control of your campus life with tools designed just for you.</p>
          <a href="/register" className="cta-button" data-aos="fade-up" data-aos-delay="200">Get Started</a>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
