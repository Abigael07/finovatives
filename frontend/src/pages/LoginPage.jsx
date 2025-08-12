import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import '../styles/AuthForm.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('userName', res.data.user.name);

      if (res.data.user.role === 'instructor') {
        navigate('/instructor-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Login failed. Please try again.');
    }
  };

  return (
    <>
      

      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        {/* 👇 Add this prompt below the form */}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#065f46', fontWeight: 'bold' }}>
            Register here
          </Link>
        </p>
      </div>

      
    </>
  );
};

export default LoginPage;
