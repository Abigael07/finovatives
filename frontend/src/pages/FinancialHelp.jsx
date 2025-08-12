import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FinancialHelp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We’ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: '#e0f2fe', color: '#1e3a8a', padding: '60px 20px', minHeight: '100vh' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
          Need Financial Guidance?
        </h2>

        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 40px', textAlign: 'center', lineHeight: '1.6' }}>
          Whether you need help paying for a course, managing farm finances, or accessing tailored support — Finovative Insights is here to help.
          Reach out and take a step toward financial empowerment.
        </p>

        {/* Contact Form */}
        <div style={{ maxWidth: '500px', margin: '0 auto 60px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Submit Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            📘 Frequently Asked Questions
          </h3>

          <div style={faqStyle}>
            <p style={questionStyle}>💸 Can I get help paying for a course?</p>
            <p>Yes! We offer financial guidance and sometimes access to sponsored training opportunities.</p>
          </div>

          <div style={faqStyle}>
            <p style={questionStyle}>📈 What kind of financial topics do you cover?</p>
            <p>We support budgeting, digital payments, farm profit planning, and connecting with microfinance groups.</p>
          </div>

          <div style={faqStyle}>
            <p style={questionStyle}>🧑‍💬 Can I speak to a real person?</p>
            <p>Yes — click the "Chat with Advisor" button or use the contact form above to reach us.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ backgroundColor: '#dbeafe', padding: '40px 20px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
            💬 What Our Learners Say
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={testimonialCard}>
              <p><strong>Mary, Kisumu:</strong> "Finovative’s financial help team helped me plan my farming budget and access subsidized training. Highly recommend!"</p>
            </div>

            <div style={testimonialCard}>
              <p><strong>Daniel, Eldoret:</strong> "I didn't know where to start, but their advisor explained everything clearly. I feel in control now."</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// 🔧 Inline Styles
const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #94a3b8',
  outlineColor: '#2563eb',
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '999px',
  border: 'none',
  cursor: 'pointer',
};

const faqStyle = { marginBottom: '20px' };
const questionStyle = { fontWeight: 'bold', marginBottom: '4px' };
const testimonialCard = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '6px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};
