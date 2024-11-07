import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm'; // Import the BookingForm
import '../styles/TutorHiringPage.css';

const TutorHiringPage = () => {
    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tutors`);
                setTutors(response.data);
            } catch (err) {
                console.error('Error fetching tutors:', err);
            }
        };
        fetchTutors();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="tutor-hiring-page">
                <main>
                    <h1 className="tutor-hiring-title">Find Your Tutor</h1>
                    <div className="tutor-hiring-list">
                        {tutors.map((tutor) => (
                            <div key={tutor._id} className="tutor-hiring-card" onClick={() => setSelectedTutor(tutor)}>
                                {tutor.photo_url && (
                                    <img src={tutor.photo_url} alt={`${tutor.name}'s profile`} className="tutor-profile-picture" />
                                )}
                                <h3>{tutor.name}</h3>
                                <p>Experience: {tutor.experience} years</p>
                                <p>Rate: ₹{tutor.hourlyRate}/hr</p>
                            </div>
                        ))}
                    </div>

                    {selectedTutor && (
                        <BookingForm selectedTutor={selectedTutor} onClose={() => setSelectedTutor(null)} />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default TutorHiringPage;
