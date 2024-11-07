import React, { useEffect } from 'react';
import '../styles/AboutUs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="about-us-container">
                <h1 className="page-title">About CampusJunction</h1>
                
                <section className="mission-section floating">
                    <h2>Welcome to CampusJunction!</h2>
                    <p>
                        CampusJunction is your go-to platform for connecting students within the campus community...
                    </p>
                </section>
                
                <section className="mission-statement floating">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to empower students by making it easier to find resources, support, and solutions.
                    </p>
                    <ul>
                        <li><strong>Marketplace:</strong> Buy and sell items like textbooks and dorm essentials.</li>
                        <li><strong>Tutor Hiring:</strong> Connect with tutors for academic support.</li>
                        <li><strong>Lost and Found:</strong> Report and find lost items on campus.</li>
                    </ul>
                </section>

                <section className="team-section floating">
                    <h2>Meet the Team</h2>
                    <div className="team-cards">
                        <div className="card">
                            <img src="https://res.cloudinary.com/dbmwlp0ys/image/upload/f_auto,q_auto/riekt8vlbx2xsliq7f9d" alt="Lokesh" className="profile-photo" />
                            <h3>Lokesh</h3>
                            <p>Team Lead and Backend Developer</p>
                            <p className="bio">Lokesh specializes in server-side development and ensures robust backend services.</p>
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/lokesh-vrma" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/LokeshVrma" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dbmwlp0ys/image/upload/c_crop,g_auto,h_800,w_800/fyxfjznwqrn9rag1wyfo.jpg" alt="Lucky" className="profile-photo" />
                            <h3>Lucky</h3>
                            <p>Frontend Developer</p>
                            <p className="bio">Lucky crafts the visual elements of CampusJunction with a focus on user experience.</p>
                            <div className="social-links">
                                <a href="https://linkedin.com/in/lucky" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/lucky" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dbmwlp0ys/image/upload/v1730819174/krhjxha1exhdqcwztw2l.jpg" alt="Devisha" className="profile-photo" />
                            <h3>Devisha</h3>
                            <p>Frontend Developer</p>
                            <p className="bio">Devisha adds creativity to the UI, making the application visually engaging.</p>
                            <div className="social-links">
                                <a href="https://linkedin.com/in/devisha" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/devisha" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dbmwlp0ys/image/upload/v1730818964/td2chb0n7aeqsfbtweuw.jpg" alt="Prince" className="profile-photo" />
                            <h3>Prince</h3>
                            <p>Database Developer</p>
                            <p className="bio">Prince manages the database, ensuring data integrity and performance.</p>
                            <div className="social-links">
                                <a href="https://linkedin.com/in/prince" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/prince" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="why-section floating">
                    <h2>Why CampusJunction?</h2>
                    <p>
                        Our platform helps students find affordable resources and stay organized. It’s built with student life in mind.
                    </p>
                </section>

                <section className="get-involved-section floating">
                    <h2>Get Involved</h2>
                    <p>
                        Whether you’re buying or selling, learning or teaching, CampusJunction has something for everyone.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
