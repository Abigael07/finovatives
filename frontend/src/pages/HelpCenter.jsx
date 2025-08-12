import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter = () => {
  const [form, setForm] = useState({ name: '', email: '', issue: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Message sent! Our support team will get back to you.');
    setForm({ name: '', email: '', issue: '' });
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.title}>🆘 Help Center</h2>

        <p style={styles.intro}>
          Need assistance? Browse common topics or reach out to our team.
        </p>

        {/* FAQ */}
        <div style={styles.section}>
          <h3 style={styles.subtitle}>📘 Frequently Asked Questions</h3>
          <ul>
            <li><strong>How do I reset my password?</strong><br />Go to your profile settings and click "Change Password".</li>
            <li><strong>Where can I view enrolled courses?</strong><br />Visit your dashboard and check "My Courses".</li>
            <li><strong>I can’t access my course material.</strong><br />Ensure you're logged in and your enrollment is complete.</li>
          </ul>
        </div>

        {/* Contact Support Form */}
        <div style={styles.section}>
          <h3 style={styles.subtitle}>✉️ Contact Support</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <textarea
              name="issue"
              placeholder="Describe your issue"
              value={form.issue}
              onChange={handleChange}
              required
              rows="4"
              style={styles.textarea}
            />
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>

        {/* Chat */}
        <div style={styles.section}>
          <h3 style={styles.subtitle}>💬 Live Chat</h3>
          <p>Coming soon! For now, contact us via the form above.</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

// Styles
const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '28px',
    color: '#065f46',
    textAlign: 'center',
    marginBottom: '20px',
  },
  intro: {
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '40px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#065f46',
    marginBottom: '12px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#065f46',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default HelpCenter;
