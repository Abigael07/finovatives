import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const SchedulePage = () => {
  const [timeSlot, setTimeSlot] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/enrollments/myschedule', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimeSlot(res.data.timeSlot || '');
        setNewTimeSlot(res.data.timeSlot || '');
      } catch (err) {
        console.error('Failed to fetch schedule:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [token]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/enrollments/update-schedule',
        { timeSlot: newTimeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeSlot(newTimeSlot);
      alert('✅ Schedule updated!');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      alert('❌ Failed to update schedule.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📅 My Learning Schedule</h2>

        {loading ? (
          <p>Loading schedule...</p>
        ) : (
          <>
            <p style={styles.timeSlotText}>
              Current Schedule: <strong>{timeSlot || 'Not set'}</strong>
            </p>

            <div style={styles.formGroup}>
              <label htmlFor="timeSlot" style={styles.label}>
                Choose New Schedule:
              </label>
              <select
                id="timeSlot"
                value={newTimeSlot}
                onChange={(e) => setNewTimeSlot(e.target.value)}
                style={styles.select}
              >
                <option value="">-- Select --</option>
                <option value="5–6 PM (Mon–Fri)">5–6 PM (Mon–Fri)</option>
                <option value="10 AM–1 PM (Sat–Sun)">10 AM–1 PM (Sat–Sun)</option>
              </select>
            </div>

            <button style={styles.button} onClick={handleUpdate}>
              🔄 Update Schedule
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    color: '#065f46',
    marginBottom: '20px',
    textAlign: 'center',
  },
  timeSlotText: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#065f46',
    color: '#fff',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
};

export default SchedulePage;
