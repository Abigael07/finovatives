import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';

const DashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const role = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const endpoint = role === 'instructor'
          ? 'http://localhost:5000/api/courses/instructor'
          : 'http://localhost:5000/api/courses';

        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [role, token]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('http://localhost:5000/api/enroll', { courseId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Enrolled successfully!');
    } catch (err) {
      alert('❌ Enroll failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(prev => prev.filter(c => c._id !== courseId));
      alert('🗑 Course deleted successfully!');
    } catch (err) {
      alert('❌ Delete failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  const instructorCourses = courses.filter(
  c => (typeof c.instructor === 'object' ? c.instructor._id : c.instructor) === userId
);


  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Welcome {name}</h2>

      {role === 'instructor' && (
        <>
          <button style={styles.uploadBtn} onClick={() => navigate('/upload-course')}>
            ➕ Upload New Course
          </button>

          <h3 style={styles.subHeader}>📚 Your Uploaded Courses</h3>
          {instructorCourses.length === 0 ? (
            <p>No courses uploaded yet.</p>
          ) : (
            <div style={styles.grid}>
              {instructorCourses.map(course => (
                <div key={course._id} style={styles.card}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p><strong>Category:</strong> {course.category}</p>

                  {course.pdfUrl && (
                    <a
                      href={`http://localhost:5000${course.pdfUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      📄 View PDF
                    </a>
                    
                  )}

                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => navigate(`/edit-course/${course._id}`)}
                      style={{ ...styles.button, backgroundColor: '#FFA000' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      style={{ ...styles.button, backgroundColor: '#E53935' }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {role === 'student' && (
        <>
          <h3 style={styles.subHeader}>📘 Available Courses</h3>
          <div style={styles.grid}>
            {courses.map(course => (
              <div key={course._id} style={styles.card}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Instructor:</strong> {course.instructor?.name || 'Unknown'}</p>

                {course.pdfUrl && (
                  <a
                    href={`http://localhost:5000${course.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    📄 View PDF
                  </a>
                )}

                <button onClick={() => handleEnroll(course._id)} style={styles.button}>
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    //backgroundColor: '#f0f4f8',
    fontFamily: 'Segoe UI, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#004d40',
    marginBottom: '30px',
    fontSize: '28px',
  },
  subHeader: {
    marginTop: '30px',
    marginBottom: '15px',
    color: '#00695c',
    fontSize: '20px',
  },
  uploadBtn: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  link: {
    display: 'block',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#00796B',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  }
};

export default DashboardPage;
