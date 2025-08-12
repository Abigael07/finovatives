import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CoursesListPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to fetch courses', err));
  }, []);

  const handleViewCourse = (courseId) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/register'); // or '/login'
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.header}>📘 Available Courses</h2>

        {courses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No courses available yet.</p>
        ) : (
          <div style={styles.grid}>
            {courses.map(course => (
              <div key={course._id} style={styles.card}>
                <h3 style={styles.title}>{course.title || 'Untitled Course'}</h3>
                <p><strong>Description:</strong> {course.description || 'No description provided.'}</p>
                <p><strong>Category:</strong> {course.category || 'N/A'}</p>
                <p><strong>Instructor:</strong> {course.instructor?.name || 'Unknown'}</p>
                <p><strong>Content:</strong> {course.content || 'Not provided.'}</p>

                {course.link && (
                  <p>
                    <strong>Link:</strong>{' '}
                    <a href={course.link} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>
                      {course.link}
                    </a>
                  </p>
                )}

                <button
                  onClick={() => handleViewCourse(course._id)}
                  style={styles.button}
                >
                  View Course
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

// === STYLES ===

const styles = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f0fdf4'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#065f46',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#065f46',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#0f6938',
    color: '#ffffff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '10px',
  },
};

export default CoursesListPage;
