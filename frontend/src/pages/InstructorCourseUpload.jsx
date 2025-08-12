import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InstructorCourseUpload = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    link: '',
    schedule: '',
    format: '',
    duration: '',
    instructorName: '',
  });
  const [pdf, setPdf] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios
      .get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user.role !== 'instructor') {
          navigate('/dashboard');
        } else {
          setRole('instructor');
          setForm((prev) => ({
            ...prev,
            instructorName: res.data.user.name,
          }));
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!pdf) return alert('Please upload a PDF');

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('pdf', pdf);

    try {
      await axios.post('http://localhost:5000/api/courses', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Course uploaded!');
      navigate('/instructor-dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Upload failed');
    }
  };

  if (role !== 'instructor') {
    return (
      <>
        <Navbar />
        <div style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#2563eb' }}>Loading instructor dashboard...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#065f46' }}>Upload New Course</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <input
            type="text"
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <textarea
            placeholder="Content (what students will learn)"
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Optional Link (e.g. YouTube)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <input
            type="text"
            placeholder="Schedule (e.g. Mon–Fri 5–6 PM)"
            required
            value={form.schedule}
            onChange={(e) => setForm({ ...form, schedule: e.target.value })}
          />
          <input
            type="text"
            placeholder="Format (e.g. PDF, Video)"
            required
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration (e.g. 4 weeks)"
            required
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />

          <div>
            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Upload Course PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setPdf(e.target.files[0])}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#f9fafb',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '10px',
              backgroundColor: '#0f6938',
              color: '#ffffff',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Upload Course
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default InstructorCourseUpload;
