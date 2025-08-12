import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AuthForm.css';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement);

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [contactForms, setContactForms] = useState([]);
  const [chartData, setChartData] = useState(null);

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses/instructor', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setCourses(res.data);
      setLoading(false);
    }).catch(err => {
      alert('❌ Failed to load instructor courses');
      setLoading(false);
    });
  }, [token]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/instructor', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChartData(res.data);
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };

    fetchChartData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert('❌ Delete failed');
    }
  };

  const fetchEnrollments = async () => {
    const res = await axios.get('http://localhost:5000/api/enroll/instructor', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEnrollments(res.data);
  };

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/api/messages/inbox', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(res.data);
  };

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:5000/api/settings/contact-messages', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setContactForms(res.data);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.header}>Welcome Instructor {name}</h2>

        <div style={styles.topBar}>
          <button onClick={() => navigate('/upload-course')} style={styles.upload}>
            ➕ Upload New Course
          </button>
          <button onClick={() => navigate('/profile')} style={styles.profileBtn}>
            👤 View Profile
          </button>
        </div>

        <h3 style={styles.sectionTitle}>📚 Your Courses</h3>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : courses.length === 0 ? (
          <p style={styles.empty}>📭 You haven’t uploaded any courses yet.</p>
        ) : (
          <div style={styles.grid}>
            {courses.map(course => (
              <div key={course._id} style={styles.card}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                {course.pdfUrl && (
                  <a href={`http://localhost:5000${course.pdfUrl}`} target="_blank" rel="noreferrer" style={styles.link}>
                    📄 View PDF
                  </a>
                )}
                {course.link && (
                  <a href={course.link} target="_blank" rel="noreferrer" style={styles.link}>
                    🔗 Visit Link
                  </a>
                )}
                <div style={{ marginTop: '12px' }}>
                  <button onClick={() => navigate(`/edit-course/${course._id}`)} style={styles.edit}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(course._id)} style={styles.delete}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 onClick={() => { setShowEnrollments(prev => !prev); if (!showEnrollments) fetchEnrollments(); }} style={styles.toggleHeader}>
          🧑‍🎓 Enrollments Per Course {showEnrollments ? '▲' : '▼'}
        </h3>
        {showEnrollments && enrollments.length > 0 && (
          <ul style={styles.list}>
            {enrollments.map((e, index) => (
              <li key={index}><strong>{e.courseTitle}</strong> – {e.studentName} ({e.timeSlot})</li>
            ))}
          </ul>
        )}

        <h3 onClick={() => { setShowMessages(prev => !prev); if (!showMessages) fetchMessages(); }} style={styles.toggleHeader}>
          💬 Inbox Messages {showMessages ? '▲' : '▼'}
        </h3>
        {showMessages && messages.length > 0 && (
          <ul style={styles.list}>
            {messages.map((m, index) => (
              <li key={index}><strong>{m.user?.name || 'Unknown'}:</strong> {m.lastMessage}</li>
            ))}
          </ul>
        )}

        <h3 onClick={() => { setShowContacts(prev => !prev); if (!showContacts) fetchContacts(); }} style={styles.toggleHeader}>
          📥 Financial Help / Contact Submissions {showContacts ? '▲' : '▼'}
        </h3>
        {showContacts && contactForms.length > 0 && (
          <ul style={styles.list}>
            {contactForms.map((c, index) => (
              <li key={index}><strong>{c.name} ({c.email}):</strong> {c.message}</li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: '40px' }}>
          <h3>📊 Instructor Analytics</h3>
          {chartData ? (
            <>
              <div style={{ maxWidth: '600px', marginBottom: '30px' }}>
                <h4>🧑‍🎓 Enrollments per Course</h4>
                <Bar
                  data={{
                    labels: chartData.enrollments.map(e => e.title),
                    datasets: [{
                      label: 'Enrollments',
                      data: chartData.enrollments.map(e => e.count),
                      backgroundColor: '#4caf50'
                    }]
                  }}
                  options={{ responsive: true }}
                />
              </div>

              <div style={{ maxWidth: '600px' }}>
                <h4>📅 Monthly Uploads</h4>
                <Line
                  data={{
                    labels: Object.keys(chartData.uploads),
                    datasets: [{
                      label: 'Uploads',
                      data: Object.values(chartData.uploads),
                      borderColor: '#2196f3',
                      fill: false
                    }]
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </>
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: { padding: '30px', fontFamily: 'Segoe UI, sans-serif' },
  header: { textAlign: 'center', color: '#0d47a1', fontSize: '28px', marginBottom: '20px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
  upload: { background: '#1e88e5', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  profileBtn: { backgroundColor: '#388e3c', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  sectionTitle: { marginTop: '30px', marginBottom: '10px', color: '#0f6938', fontSize: '22px' },
  toggleHeader: { marginTop: '40px', cursor: 'pointer', color: '#2e7d32', borderBottom: '1px dashed #ccc', paddingBottom: '5px', fontSize: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  link: { display: 'block', marginTop: '10px', color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' },
  edit: { backgroundColor: '#43a047', color: 'white', padding: '8px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' },
  delete: { backgroundColor: '#2e7d32', color: 'white', padding: '8px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  loading: { textAlign: 'center', fontSize: '18px', color: '#1565c0' },
  empty: { textAlign: 'center', fontStyle: 'italic', color: '#555', fontSize: '16px' },
  list: { marginTop: '10px', paddingLeft: '20px', lineHeight: '1.6' }
};

export default InstructorDashboard;
