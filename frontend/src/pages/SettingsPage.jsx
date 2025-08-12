import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        if (res.data.user.theme) setTheme(res.data.user.theme);
        if (res.data.user.emailNotifications !== undefined) {
          setEmailNotifications(res.data.user.emailNotifications);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, [token, setTheme]);

  const handleSaveSettings = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/settings',
        { emailNotifications, theme },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Settings saved!');
    } catch (err) {
      console.error('Error saving settings:', err.response?.data || err.message);
      alert('❌ Failed to save settings.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>⚙️ Settings</h2>

        {user && (
          <div style={{ marginBottom: '20px' }}>
            <h4>👤 Logged in as: {user.name}</h4>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div style={styles.settingItem}>
          <label style={styles.label}>Email Notifications</label>
          <select
            value={emailNotifications ? 'on' : 'off'}
            onChange={(e) => setEmailNotifications(e.target.value === 'on')}
            style={styles.select}
          >
            <option value="on">Enabled</option>
            <option value="off">Disabled</option>
          </select>
        </div>

        <div style={styles.settingItem}>
          <label style={styles.label}>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button onClick={handleSaveSettings} style={styles.saveButton}>
          💾 Save Settings
        </button>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    //backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  settingItem: {
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
  saveButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
};

export default SettingsPage;
