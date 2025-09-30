import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setEditedUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchUser();
  }, []);

  const handleDashboardRedirect = () => {
    if (!user || !user.role) return;
    if (user.role === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        {
          name: editedUser.name,
          email: editedUser.email,
          description: editedUser.description,
          profilePic: editedUser.profilePic,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUser = res.data.user;
      setUser(updatedUser);
      setEditedUser(updatedUser);
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Update failed:', err.response?.data || err.message);
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/auth/upload-profile-pic',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setEditedUser((prev) => ({ ...prev, profilePic: res.data.url }));
      setUser((prev) => ({ ...prev, profilePic: res.data.url }));
      alert('✅ Profile picture uploaded!');
    } catch (err) {
      console.error('❌ Upload error:', err.message);
      alert('Failed to upload profile picture');
    }
  };

  if (!editedUser) return <div style={{ padding: 20 }}>Loading profile...</div>;

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: 10, textAlign: 'right' }}>
        <button onClick={handleDashboardRedirect} style={styles.dashboardBtn}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
          {editedUser.profilePic ? (
            <img
              src={`http://localhost:5000/${editedUser.profilePic}`}
              alt="Profile"
              style={styles.profileImage}
            />
          ) : (
            <div style={{
              ...styles.profileImage,
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#555',
              textAlign: 'center'
            }}>
              No Image
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.fileInput}
          />
          <div>
            <h2 style={styles.name}>{editedUser.name}</h2>
            <p style={styles.email}>{editedUser.email}</p>
            <span style={styles.role}>{editedUser.role}</span>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>About Me</h3>
          <p>{editedUser.description || 'No description yet.'}</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            {editedUser.role === 'instructor' ? 'Uploaded Courses' : 'Enrolled Courses'}
          </h3>
          <ul>
            {editedUser.courses && editedUser.courses.length > 0 ? (
              editedUser.courses.map((course, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <strong>{typeof course === 'string' ? course : course.title || 'Untitled Course'}</strong>

                  {course.pdfUrl && typeof course.pdfUrl === "string" && (
                    <a
                      href={`http://localhost:5000${course.pdfUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ marginLeft: 10, color: '#1e88e5' }}
                    >
                      📄 View PDF
                    </a>
                  )}

                  {course.link && typeof course.link === "string" && (
                    <a
                      href={course.link.startsWith("http") ? course.link : `http://${course.link}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ marginLeft: 10, color: '#1e88e5' }}
                    >
                      🔗 Visit Link
                    </a>
                  )}
                </li>
              ))
            ) : (
              <li>No courses found</li>
            )}
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Edit Profile</h3>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            placeholder="Name"
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="text"
            name="profilePic"
            value={editedUser.profilePic ? `http://localhost:5000/${editedUser.profilePic}` : ""}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            style={styles.input}
          />
          <textarea
            name="description"
            value={editedUser.description || ''}
            onChange={handleChange}
            placeholder="About Me"
            style={{ ...styles.input, height: '80px' }}
          />
          <div style={styles.buttonGroup}>
            <button onClick={handleSave} style={styles.saveBtn}>💾 Save</button>
            <button onClick={handleCancel} style={styles.cancelBtn}>❌ Cancel</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 0 12px rgba(0, 128, 128, 0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'center',
    borderBottom: '2px solid #e0f0f0',
    paddingBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #00b894',
  },
  fileInput: {
    display: 'block',
    marginBottom: 10,
  },
  name: {
    margin: 0,
    color: '#0077b6',
  },
  email: {
    margin: '4px 0',
    color: '#333',
  },
  role: {
    padding: '5px 10px',
    background: '#48cae4',
    color: 'white',
    borderRadius: 5,
    fontSize: '0.9rem',
    display: 'inline-block',
    marginTop: 5,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#0077b6',
  },
  input: {
    width: '100%',
    padding: 10,
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    marginTop: 10,
  },
  saveBtn: {
    background: '#00b894',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 5,
    marginRight: 10,
    cursor: 'pointer',
  },
  cancelBtn: {
    background: '#9974ff',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  dashboardBtn: {
    background: '#0077b6',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    marginBottom: 20,
    fontWeight: 500,
  },
};

export default ProfilePage;
