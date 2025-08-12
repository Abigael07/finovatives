// src/pages/AboutPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Click "Enroll Now" on any course page, select your time slot, and complete payment.',
  },
  {
    question: 'Can I become an instructor?',
    answer: 'Yes! Contact us or register as an instructor to start uploading your courses.',
  },
  {
    question: 'Do I need to pay for all content?',
    answer: 'Some content is free. Premium courses require payment after time selection.',
  },
];

const AboutPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* About Us */}
        <section style={styles.section}>
          <h2 style={styles.title}>About Us</h2>
          <p style={styles.text}>
            Finovative Insights is an innovative eLearning platform focused on delivering
            financial education and skill-building resources to students, entrepreneurs, and professionals.
            We blend flexible learning schedules, expert instructors, and practical content to help you succeed.
          </p>
        </section>

        {/* Careers */}
        <section style={styles.section}>
          <h2 style={styles.title}>Careers</h2>
          <p style={styles.text}>
            Join a passionate team that’s reshaping financial literacy across Africa and beyond.
            Whether you're a developer, instructor, or community builder, there's space for you at Finovative.
            <br />
            <br />
            <strong>Want to join?</strong> Email us at{' '}
            <a href="mailto:careers@finovative.com" style={styles.link}>careers@finovative.com</a>
          </p>
        </section>

        {/* FAQs */}
        <section style={styles.section}>
          <h2 style={styles.title}>Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div
                  style={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </div>
                {openIndex === index && (
                  <div style={styles.faqAnswer}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  section: {
    marginBottom: 40,
  },
  title: {
    color: '#065f46',
    fontSize: '24px',
    marginBottom: 10,
    borderBottom: '2px solid #ccf0e1',
    paddingBottom: 6,
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#333',
  },
  link: {
    color: '#0ea5e9',
    textDecoration: 'underline',
  },
  faqItem: {
    marginBottom: 15,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 12,
    background: '#f9f9f9',
    cursor: 'pointer',
  },
  faqQuestion: {
    fontWeight: 'bold',
    color: '#065f46',
  },
  faqAnswer: {
    marginTop: 8,
    color: '#444',
    lineHeight: 1.4,
  },
};

export default AboutPage;
