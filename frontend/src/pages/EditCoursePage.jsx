import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AuthForm.css';

const EditCoursePage = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    image: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Course updated!');
      navigate('/dashboard');
    } catch (err) {
      alert('❌ Update failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', color: '#065f46' }}>Edit Course</h2>
        <form onSubmit={handleUpdate}>
          {['title', 'category', 'image', 'description', 'content'].map(field => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
              style={{
                display: 'block',
                marginBottom: '15px',
                padding: '12px',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
          ))}

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#0f6938',
              color: '#ffffff',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Update Course
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditCoursePage;
