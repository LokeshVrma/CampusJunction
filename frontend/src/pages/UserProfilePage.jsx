import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, { withCredentials: true });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/bookings`, { withCredentials: true });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
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

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/bookings/status`,
        { bookingId, status: newStatus },
        { withCredentials: true }
      );
      setBookings(prev =>
        prev.map(b => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  const buttonBase = {
    padding: '0.6rem 1.4rem',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
    margin: '0.4rem 0.5rem 0.4rem 0',
    transition: 'all 0.3s ease-in-out',
    fontSize: '0.95rem'
  };

  const glow = {
    boxShadow: '0 0 12px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
    filter: 'brightness(1.1)',
  };

  const renderStatus = (status) => {
    const colorMap = {
      confirmed: '#28a745',
      pending: '#ffc107',
      canceled: '#dc3545',
      default: '#6c757d'
    };
    return (
      <span style={{
        fontWeight: 'bold',
        color: colorMap[status] || colorMap.default,
        textTransform: 'capitalize'
      }}>
        {status}
      </span>
    );
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profile...</div>;

  return (
    <div>
      <Navbar />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .profile-container {
          animation: fadeInUp 0.8s ease-in-out;
        }

        button:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        .booking-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
        }

        .avatar:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '1rem' }}>
        {profile ? (
          <div className="profile-container" style={{
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            background: 'linear-gradient(to bottom right, #fdfdfd, #f0f0ff)',
          }}>
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <img
                src={profile.cover_photo_url || 'https://placehold.co/900x250'}
                alt="Cover"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
              <img
                src={profile.photo_url || 'https://placehold.co/120x120'}
                alt="Avatar"
                className="avatar"
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #fff',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{profile.name}</h1>
              <p style={{ color: '#777' }}>{profile.email}</p>
            </div>

            <div style={{ marginTop: '2rem', lineHeight: '1.8', fontSize: '1rem' }}>
              <p><strong>Phone:</strong> {profile.phone_num}</p>
              <p><strong>College:</strong> {profile.college_name}</p>
              <p><strong>UID:</strong> {profile.college_uid}</p>
              <p><strong>Joined On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
              <div>
                <strong>UID Photo:</strong><br />
                <img
                  src={profile.college_uid_photo_url || 'https://placehold.co/100x100'}
                  alt="UID"
                  style={{ width: '100px', marginTop: '0.6rem', borderRadius: '8px' }}
                />
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button onClick={handleLogout} style={{ ...buttonBase, background: 'linear-gradient(to right, #f12711, #f5af19)' }}>Logout</button>
                <button onClick={() => navigate('/products/create')} style={{ ...buttonBase, background: 'linear-gradient(to right, #36d1dc, #5b86e5)' }}>Create Product</button>
                <button onClick={() => navigate('/join-as-tutor')} style={{ ...buttonBase, background: 'linear-gradient(to right, #8e2de2, #4a00e0)' }}>Join as Tutor</button>
              </div>
            </div>

            {/* Bookings */}
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Your Bookings</h2>
              {loadingBookings ? (
                <p>Loading bookings...</p>
              ) : bookings.length > 0 ? (
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {bookings.map((b) => (
                    <li
                      className="booking-card"
                      key={b._id}
                      style={{
                        padding: '1.2rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        background: '#fff',
                        border: '1px solid #eee',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h3 style={{ marginBottom: '0.5rem' }}>Booked By: {b.userId.name}</h3>
                      <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {b.time}</p>
                      <p><strong>Status:</strong> {renderStatus(b.status)}</p>
                      <div style={{ marginTop: '0.6rem' }}>
                        <button
                          onClick={() => updateBookingStatus(b._id, 'confirmed')}
                          disabled={b.status === 'confirmed'}
                          style={{
                            ...buttonBase,
                            background: 'linear-gradient(to right, #11998e, #38ef7d)',
                            ...(b.status === 'confirmed' ? { opacity: 0.5, cursor: 'not-allowed' } : {})
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateBookingStatus(b._id, 'canceled')}
                          disabled={b.status === 'canceled'}
                          style={{
                            ...buttonBase,
                            background: 'linear-gradient(to right, #e53935, #e35d5b)',
                            ...(b.status === 'canceled' ? { opacity: 0.5, cursor: 'not-allowed' } : {})
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>Could not load profile.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
