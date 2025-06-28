import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'; 
import Branding from '../components/Branding';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [backendError, setBackendError] = useState('');
    const { setUserContext } = useContext(UserContext);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                    email: formData.email,
                    password: formData.password,
                }, {
                    withCredentials: true,
                });
    
                setFormSubmitted(true);
    
                const userResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
                    withCredentials: true,
                });
                setUserContext(userResponse.data);
                navigate('/');
            } catch (error) {
                if (error.response && error.response.data) {
                    setBackendError(error.response.data.message);
                } else {
                    setBackendError('An error occurred. Please try again.');
                }
            }
        }
    };
    
    useEffect(() => {
        if (formSubmitted) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [formSubmitted, navigate]);

    return (
        
        <div className="auth-page">
            <div className="auth-intro">
                <h1>Welcome to {Branding()}</h1>
                <p>Please log in to continue.</p>
            </div>
            <div className="auth-form-container">
                {!formSubmitted ? (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <br /><br />
                            {errors.email && <p className="auth-error">{errors.email}</p>}
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <br /><br />
                            {errors.password && <p className="auth-error">{errors.password}</p>}
                        </div>

                        {backendError && <p className="auth-error">{backendError}</p>}

                        <button type="submit" className="auth-submit-button">
                            Log In
                        </button>

                        <div className="auth-login-link">
                            <p>Don't have an account? <a href="/register">Register here</a></p>
                        </div>
                    </form>
                ) : (
                    <div className="auth-success-message">
                        <h2>Login Successful!</h2>
                        <p>Redirecting to the home page...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
