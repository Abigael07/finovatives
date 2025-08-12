import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCourses(res.data))
      .catch(err => {
        console.error('Error loading courses:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [token, navigate]);

  const handleEnroll = (courseId) => {
    navigate(`/select-time/${courseId}`);
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.header}>Welcome Student {name}</h2>

        <div style={styles.topBar}>
          <button onClick={() => navigate('/profile')} style={styles.profileBtn}>
            👤 View Profile
          </button>
        </div>

        {courses.length === 0 ? (
          <p style={styles.emptyText}>No courses available yet.</p>
        ) : (
          <div style={styles.grid}>
            {courses.map(course => (
              <div key={course._id} style={styles.card}>
                
                {course.imageUrl && (
                  <img
                    src={`http://localhost:5000/${course.imageUrl}`}
                    alt={course.title}
                    style={styles.image}
                  />
                )}

                <h3 style={styles.title}>{course.title}</h3>

                <p style={styles.description}>
                  {course.description?.slice(0, 100)}...
                </p>

                <button onClick={() => handleEnroll(course._id)} style={styles.enroll}>
                  ✅ Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '80vh',
    backgroundColor: '#f0fdf4',
  },
  header: {
    textAlign: 'center',
    color: '#2e7d32',
    fontSize: '28px',
    marginBottom: '20px'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  },
  profileBtn: {
    backgroundColor: '#43a047',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: '0.3s'
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '12px'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: '8px'
  },
  description: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '12px'
  },
  enroll: {
    backgroundColor: '#1e88e5',
    color: 'white',
    padding: '10px 14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default StudentDashboard;
