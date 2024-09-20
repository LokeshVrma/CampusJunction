import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Assuming you have a CSS file
import Branding from '../components/Branding';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const validationErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            validationErrors.email = 'Please enter a valid email';
        }

        if (!formData.password || formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setFormSubmitted(true);
        }
    };

    useEffect(() => {
        if (formSubmitted) {
            const timer = setTimeout(() => {
                navigate('/'); // Redirect to the home page
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [formSubmitted, navigate]);

    return (
        <div className="page-container">
            <div className="intro-container">
                <h1>Welcome to {Branding()}</h1>
                <p>Please log in to continue.</p>
            </div>
            <div className="form-container">
                {!formSubmitted ? (
                    <>
                        <div className="form-step">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>

                            <div>
                                <button onClick={handleSubmit} style={{ marginLeft: "75px", width: "50%" }}>
                                    Log In
                                </button>
                            </div>
                        </div>

                        <div className="login-link">
                            <p>Don't have an account? <a href="/register">Register here</a></p>
                        </div>
                    </>
                ) : (
                    <div className="success-message">
                        <h2>Login Successful!</h2>
                        <p>Redirecting to the home page...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
