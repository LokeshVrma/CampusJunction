import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar'; // Assuming you have Navbar component
import Footer from '../components/Footer'; // Assuming you have Footer component
import axios from 'axios';

const UserProfilePage = () => {
  const { id } = useParams();
  const { user, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div style={styles.pageWrapper}>
      <Navbar /> {/* Navbar component */}
      <div style={styles.contentContainer}>
        {profile ? (
          <div style={styles.profileContainer}>
            <h1 style={styles.profileName}>{profile.name}</h1>
            <div style={styles.profileHeader}>
              <img
                style={styles.coverPhoto}
                src={profile.cover_photo_url || 'https://placehold.co/800x300'}
                alt="Cover Photo"
              />
              <img
                style={styles.profileAvatar}
                src={profile.photo_url || 'https://placehold.co/150x150'}
                alt="User Avatar"
              />
            </div>
            <div style={styles.profileDetails}>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone No:</strong> {profile.phone_num}</p>
              <p><strong>College:</strong> {profile.college_name}</p>
              <p><strong>UID:</strong> {profile.college_uid}</p>
              <div style={styles.uidPhotoContainer}>
                <strong>UID Photo:</strong>
                <img style={styles.uidPhoto} src={profile.college_uid_photo_url || 'https://placehold.co/100x100'} alt="UID" />
              </div>
              <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </div>
          </div>
        ) : (
          <div>Unable to load profile information</div>
        )}
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    marginBottom: '40px', // Added space between footer and content
  },
  profileContainer: {
    width: '100%',
    maxWidth: '1000px',
  },
  profileHeader: {
    position: 'relative',
    textAlign: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  profileAvatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '5px solid #fff',
    position: 'absolute',
    bottom: '-75px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  profileName: {
    fontSize: '32px', // Made the name more prominent
    textAlign: 'center',
    marginBottom: '20px',
  },
  profileDetails: {
    padding: '20px',
    textAlign: 'left',
    fontSize: '16px',
  },
  uidPhotoContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  uidPhoto: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  logoutButton: {
    display: 'block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default UserProfilePage;
