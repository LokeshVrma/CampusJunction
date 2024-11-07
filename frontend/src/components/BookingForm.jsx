import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ selectedTutor, onClose }) => {
    const { user } = useContext(UserContext);
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        time: '',
        subject: selectedTutor.subjects[0] || '',
        notes: ''
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState('');

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleBookNow = async (e) => {
        e.preventDefault();
        if (!user) {
            setBookingError('You must be logged in to book a session.');
            toast.error('You must be logged in to book a session.');
            return;
        }
    
        try {
            const bookingData = {
                tutorId: selectedTutor._id,
                userId: user._id,
                ...bookingDetails,
            };
    
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, bookingData);
            setBookingSuccess(true);
            toast.success('Booking successful!');
    
            // Delay closing the modal
            setTimeout(() => {
                onClose(); // Close the modal after a delay
            }, 5000); 
    
            setBookingDetails({ date: '', time: '', subject: selectedTutor.subjects[0] || '', notes: '' });
        } catch (error) {
            console.error('Error booking session:', error);
            setBookingError('Failed to book the session. Please try again.');
            toast.error('Failed to book the session. Please try again.');
        }
    };
    

    return (
        <div className="booking-form-modal">
            <div className="booking-form-modal-content">
                <span className="booking-form-close" onClick={onClose}>&times;</span>
                <h2>{selectedTutor.name}</h2>
                {selectedTutor.photo_url && (
                    <img src={selectedTutor.photo_url} alt={`${selectedTutor.name}'s profile`} className="tutor-profile-picture" />
                )}
                <form onSubmit={handleBookNow}>
                    <label>
                        Date:
                        <input type="date" name="date" value={bookingDetails.date} onChange={handleBookingChange} required />
                    </label>
                    <label>
                        Time:
                        <input type="time" name="time" value={bookingDetails.time} onChange={handleBookingChange} required />
                    </label>
                    <label>
                        Subject:
                        <select name="subject" value={bookingDetails.subject} onChange={handleBookingChange} required>
                            {selectedTutor.subjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Notes:
                        <textarea name="notes" value={bookingDetails.notes} onChange={handleBookingChange}></textarea>
                    </label>
                    <button className="tutor-hiring-button" type="submit">Book Now</button>
                </form>
            </div>
            <ToastContainer /> {/* Include the toast container */}
        </div>
    );
};

export default BookingForm;
