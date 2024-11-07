import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../styles/JoinTutorPage.css'; // Import the CSS file

const JoinTutorPage = () => {
  const [formData, setFormData] = useState({
    subjects: '', // Store subjects as a string initially
    hourlyRate: '',
    bio: '',
    availability: '', // Default availability is an empty string
    name: '', // Add name field
    photo_url: '', // Store the profile picture URL
    email: ''
  });

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, { withCredentials: true });
        const { name, photo_url, email } = response.data; // Assuming photo_url is included in the response

        setFormData(prevState => ({
          ...prevState,
          name, // Add name to the data
          photo_url, // Set the photo_url URL from the response
          email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data.'); // Use toast for errors
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tutorData = {
        ...formData,
        subjects: formData.subjects.split(',').map(subject => subject.trim()), // Split and trim subjects to create an array
        photo_url: formData.photo_url // This is the URL of the user's profile picture
      };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tutors`, tutorData, {
        withCredentials: true,
      });
      
      toast.success('Successfully joined as a tutor!'); // Show success toast
      setTimeout(() => {
        navigate('/');
    }, 8000);
    } catch (error) {
      console.error('Error joining as tutor:', error);
      toast.error('Failed to join as a tutor. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="join-tutor-container">
      <h1 className="join-tutor-title">Join as a Tutor</h1>
      <form className="join-tutor-form" onSubmit={handleSubmit}>
        
        <div>
          <label>Subjects (comma-separated):</label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            placeholder="e.g. Math, Science, English" // Placeholder for better UX
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Availability:</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select availability</option>
            <option value="Weekdays 9am - 5pm">Weekdays 9am - 5pm</option>
            <option value="Weekdays 5pm - 9pm">Weekdays 5pm - 9pm</option>
            <option value="Weekends 9am - 5pm">Weekends 9am - 5pm</option>
            <option value="Weekends 5pm - 9pm">Weekends 5pm - 9pm</option>
            <option value="Flexible">Flexible</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Join as Tutor</button>
      </form>
      <ToastContainer /> {/* Include the toast container */}
    </div>
  );
};

export default JoinTutorPage;
