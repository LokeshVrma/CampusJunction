import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import Branding from '../components/Branding';
import axios from 'axios';

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: null,
        phone: '',
        address: '',
        collegeName: '',
        collegeUID: '',
        idCardPhoto: null,
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [backendError, setBackendError] = useState('');

    const validateStep = (stepToValidate = step) => {
        const stepErrors = {};

        // Validate Step 1
        if (stepToValidate === 1) {
            if (!formData.name.trim()) stepErrors.name = 'Name is required';
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email) {
                stepErrors.email = 'Email is required';
            } else if (!emailPattern.test(formData.email)) {
                stepErrors.email = 'Please enter a valid email';
            }
            if (!formData.password || formData.password.length < 6) {
                stepErrors.password = 'Password must be at least 6 characters';
            }
        }

        // Validate Step 2
        if (stepToValidate === 2) {
            if (!formData.photo) stepErrors.photo = 'Photo is required';
            const phonePattern = /^[0-9]{10}$/;
            if (!formData.phone || !phonePattern.test(formData.phone)) {
                stepErrors.phone = 'Please enter a valid 10-digit phone number';
            }
            if (!formData.address.trim()) stepErrors.address = 'Address is required';
        }

        // Validate Step 3
        if (stepToValidate === 3) {
            if (!formData.collegeName.trim()) stepErrors.collegeName = 'College name is required';
            if (!formData.collegeUID.trim()) stepErrors.collegeUID = 'College UID is required';
            if (!formData.idCardPhoto) stepErrors.idCardPhoto = 'ID Card photo is required';
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleStepClick = (newStep) => {
        if (newStep < step) {
            setStep(newStep);
        } else if (validateStep()) {
            setStep(newStep);
        }
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep()) {
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('photo_url', formData.photo); // Corrected
            formDataToSend.append('phone_num', formData.phone); // Corrected
            formDataToSend.append('address', formData.address);
            formDataToSend.append('college_name', formData.collegeName); // Corrected
            formDataToSend.append('college_uid', formData.collegeUID);
            formDataToSend.append('college_uid_photo_url', formData.idCardPhoto); // Corrected
    
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                setFormSubmitted(true);
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
                navigate('/login'); // Redirect to the home page
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [formSubmitted, navigate]);

    return (
        <div className="auth-page">
            <div className="auth-intro">
                <h1>Welcome to {Branding()}</h1>
                <p>Join us today and start your journey. Please complete the registration process below.</p>
            </div>
            <div className="auth-form-container">
                <div className="step-indicator">
                    <div
                        className={`circle ${step === 1 ? 'active' : ''}`}
                        onClick={() => handleStepClick(1)}
                    >1</div>
                    <div className="line"></div>
                    <div
                        className={`circle ${step === 2 ? 'active' : ''}`}
                        onClick={() => handleStepClick(2)}
                    >2</div>
                    <div className="line"></div>
                    <div
                        className={`circle ${step === 3 ? 'active' : ''}`}
                        onClick={() => handleStepClick(3)}
                    >3</div>
                </div>

                {!formSubmitted ? (
                    <>
                        {step === 1 && (
                            <div className="form-step">
                                <div className="auth-form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <p className="auth-error">{errors.name}</p>}
                                </div>

                                <div className="auth-form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
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
                                    {errors.password && <p className="auth-error">{errors.password}</p>}
                                </div>
                                <div>
                                    <button className='auth-submit-button' style={{ marginLeft: "75px", width: "50%" }} onClick={nextStep}>Next</button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="form-step">
                                <div className="auth-form-group">
                                    <label htmlFor="photo">Upload Photo:</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                                        required
                                    />
                                    {errors.photo && <p className="auth-error">{errors.photo}</p>}
                                </div>

                                <div className="auth-form-group">
                                    <label htmlFor="phone">Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <p className="auth-error">{errors.phone}</p>}
                                </div>

                                <div className="auth-form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && <p className="auth-error">{errors.address}</p>}
                                </div>
                                <div className='two-button'>
                                    <button onClick={prevStep}>Back</button>
                                    <button onClick={nextStep}>Next</button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="form-step">
                                <div className="auth-form-group">
                                    <label htmlFor="collegeName">College Name:</label>
                                    <input
                                        type="text"
                                        id="collegeName"
                                        name="collegeName"
                                        placeholder="Enter College Name"
                                        value={formData.collegeName}
                                        onChange={handleChange}
                                    />
                                    {errors.collegeName && <p className="auth-error">{errors.collegeName}</p>}
                                </div>

                                <div className="auth-form-group">
                                    <label htmlFor="collegeUID">College UID:</label>
                                    <input
                                        type="text"
                                        id="collegeUID"
                                        name="collegeUID"
                                        placeholder="Enter College UID"
                                        value={formData.collegeUID}
                                        onChange={handleChange}
                                    />
                                    {errors.collegeUID && <p className="auth-error">{errors.collegeUID}</p>}
                                </div>

                                <div className="auth-form-group">
                                    <label htmlFor="idCardPhoto">ID Card Photo:</label>
                                    <input
                                        type="file"
                                        name="idCardPhoto"
                                        onChange={(e) => setFormData({ ...formData, idCardPhoto: e.target.files[0] })}
                                        required
                                    />
                                    {errors.idCardPhoto && <p className="auth-error">{errors.idCardPhoto}</p>}
                                </div>

                                {backendError && <p className="auth-error">{backendError}</p>}
                                
                                <div className='two-button'>
                                    <button onClick={prevStep}>Back</button>
                                    <button onClick={handleSubmit}>Sign Up</button>
                                </div>
                            </div>
                        )}
                        <div className="auth-login-link">
                            <p>Already have an account? <a href="/login">Login here</a></p>
                        </div>
                    </>
                ) : (
                    <div className="auth-success-message">
                        <h2>Registration Successful!</h2>
                        <p>Redirecting to the home page...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;

