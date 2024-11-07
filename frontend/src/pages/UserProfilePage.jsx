import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/bookings`, {
          withCredentials: true,
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchProfile();
    fetchBookings();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigateToCreateProduct = () => navigate('/products/create');
  const navigateToJoinTutor = () => navigate('/join-as-tutor');

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/status`, { bookingId, status: newStatus }, { withCredentials: true });
      setBookings(prevBookings => 
        prevBookings.map(booking => booking._id === bookingId ? { ...booking, status: newStatus } : booking)
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading) {
    return <div className="user-profile-loading">Loading profile...</div>;
  }

  const renderStatus = (status) => {
    let statusStyle;
    switch (status) {
      case 'confirmed':
        statusStyle = { color: 'green' };
        break;
      case 'pending':
        statusStyle = { color: 'orange' };
        break;
      case 'canceled':
        statusStyle = { color: 'red' };
        break;
      default:
        statusStyle = {};
    }
    return <span style={statusStyle}>{status}</span>;
  };

  return (
    <div className="user-profile-page">
      <Navbar />
      <div className="user-profile-content">
        {profile ? (
          <div className="user-profile-container">
            <h1 className="user-profile-name">{profile.name}</h1>
            <div className="user-profile-header">
              <img
                className="user-profile-cover-photo"
                src={profile.cover_photo_url || 'https://placehold.co/800x300'}
                alt="Cover Photo"
              />
              <img
                className="user-profile-avatar"
                src={profile.photo_url || 'https://placehold.co/150x150'}
                alt="User Avatar"
              />
            </div>
            <div className="user-profile-details">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone No:</strong> {profile.phone_num}</p>
              <p><strong>College:</strong> {profile.college_name}</p>
              <p><strong>UID:</strong> {profile.college_uid}</p>
              <div className="user-profile-uid-photo-container">
                <strong>UID Photo:</strong>
                <img className="user-profile-uid-photo" src={profile.college_uid_photo_url || 'https://placehold.co/100x100'} alt="UID" />
              </div>
              <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
              <button onClick={handleLogout} className="user-profile-logout-button">Logout</button>
              <button onClick={navigateToCreateProduct} className="user-profile-action-button">Create Product</button>
              <button onClick={navigateToJoinTutor} className="user-profile-action-button">Join as Tutor</button>
            </div>

            {/* Bookings Section */}
            <div className="user-profile-bookings">
              <h2>Your Bookings</h2>
              {loadingBookings ? (
                <p>Loading bookings...</p>
              ) : bookings.length > 0 ? (
                <ul>
                  {bookings.map((booking) => (
                    <li key={booking._id} className={`booking-item booking-${booking.status}`}>
                      <h3>Booked By: {booking.userId.name}</h3>
                      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                      <p><strong>Status:</strong> {renderStatus(booking.status)}</p>
                      <button onClick={() => updateBookingStatus(booking._id, 'confirmed')} disabled={booking.status === 'confirmed'}>Confirm</button>
                      <button onClick={() => updateBookingStatus(booking._id, 'canceled')} disabled={booking.status === 'canceled'}>Cancel</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings found.</p>
              )}
            </div>
          </div>
        ) : (
          <div>Unable to load profile information</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
