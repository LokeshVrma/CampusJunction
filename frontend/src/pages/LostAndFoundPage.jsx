import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/LostAndFound.css';

function LostAndFoundPage() {
    const [notices, setNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [location, setLocation] = useState('');
    const [foundBy, setFoundBy] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/lostfound`)
            .then(response => setNotices(response.data))
            .catch(error => console.error('Error fetching notices:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = { itemName, description, contactInfo, location, foundBy };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/lostfound`, newNotice)
            .then(response => {
                setNotices([...notices, response.data]);
                setItemName('');
                setDescription('');
                setContactInfo('');
                setLocation('');
                setFoundBy('');
                setIsModalOpen(false);
            })
            .catch(error => console.error('Error adding notice:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/lostfound/${id}`)
            .then(() => {
                setNotices(notices.filter(notice => notice._id !== id));
            })
            .catch(error => console.error('Error deleting notice:', error));
    };

    return (
        <div>
            <Navbar />
            <div className="lost-and-found-page">
                <h1 className="lost-and-found-title">Lost and Found Notice Board</h1>
                <button className="lost-and-found-new-notice-button" onClick={() => setIsModalOpen(true)}>
                    + Report a Lost/Found Item
                </button>
                <div className="lost-and-found-notice-board">
                    {notices.map(notice => (
                        <div className="lost-and-found-notice-card" key={notice._id}>
                            <h2 className="lost-and-found-notice-title">{notice.itemName}</h2>
                            <p className="lost-and-found-notice-description">{notice.description}</p>
                            <p className="lost-and-found-contact-info">Contact: {notice.contactInfo}</p>
                            <p className="lost-and-found-location-info">Location Found: {notice.location}</p>
                            <p className="lost-and-found-found-by-info">Found By: {notice.foundBy}</p>
                            <button className="lost-and-found-delete-button" onClick={() => handleDelete(notice._id)}>Delete</button>
                            <button className="lost-and-found-call-button" onClick={() => window.location.href = `tel:${notice.contactInfo}`}>Call</button>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="lost-and-found-modal-overlay">
                        <div className="lost-and-found-modal">
                            <h2>Report a Lost/Found Item</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="lost-and-found-form-input"
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="Item Name"
                                    required
                                />
                                <textarea
                                    className="lost-and-found-form-textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    required
                                />
                                <input
                                    className="lost-and-found-form-input"
                                    type="text"
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    placeholder="Contact Information"
                                    required
                                />
                                <input
                                    className="lost-and-found-form-input"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location Found"
                                    required
                                />
                                <input
                                    className="lost-and-found-form-input"
                                    type="text"
                                    value={foundBy}
                                    onChange={(e) => setFoundBy(e.target.value)}
                                    placeholder="Found By (Your Name)"
                                    required
                                />
                                <button className="lost-and-found-submit-button" type="submit">Post Notice</button>
                                <button
                                    className="lost-and-found-cancel-button"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default LostAndFoundPage;
