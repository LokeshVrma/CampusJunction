import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ selectedTutor, onClose }) => {
  const { user } = useContext(UserContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [subject, setSubject] = useState(selectedTutor.subjects[0] || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookNow = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to book a session.');
      return;
    }

    if (!selectedDateTime) {
      toast.error('Please select a valid date and time.');
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        tutorId: selectedTutor._id,
        userId: user._id,
        date: selectedDateTime.toISOString().split('T')[0],
        time: selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subject,
        notes,
      };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, bookingData);
      toast.success('Booking successful!');
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error booking session:', error);
      toast.error('Failed to book the session. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        {loading && <div style={styles.overlay}>Booking...</div>}
        <span style={styles.closeBtn} onClick={onClose}>&times;</span>
        <h2 style={styles.heading}>{selectedTutor.name}</h2>
        {selectedTutor.photo_url && (
          <img src={selectedTutor.photo_url} alt={`${selectedTutor.name}`} style={styles.tutorImage} />
        )}
        <form onSubmit={handleBookNow} style={styles.form}>
          <label style={styles.label}>Select Date & Time:</label>
          <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
            minDate={new Date()}
            placeholderText="Choose date & time"
            className="datepicker-input"
            disabled={loading}
            style={styles.input}
          />

          <label style={styles.label}>Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
          >
            {selectedTutor.subjects.map((subj, index) => (
              <option key={index} value={subj}>{subj}</option>
            ))}
          </select>

          <label style={styles.label}>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ ...styles.input, height: '80px', resize: 'none' }}
            placeholder="Any special instructions..."
            disabled={loading}
          />

          <button type="submit" style={{ ...styles.bookBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? <span style={styles.spinner}></span> : 'Book Now'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  modalBackdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    position: 'relative',
    animation: 'slideIn 0.5s ease-in-out',
    overflow: 'hidden'
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#888',
    transition: 'color 0.2s',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  tutorImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    display: 'block',
    margin: '10px auto',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontWeight: '600',
    fontSize: '15px',
    marginBottom: '4px',
    color: '#444',
  },
  input: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  bookBtn: {
    marginTop: '10px',
    padding: '12px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid #fff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    zIndex: 10,
  }
};

// Add keyframe animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`, styleSheet.cssRules.length);

export default BookingForm;
