import { useEffect, useState } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token (if required)
        const res = await fetch('http://localhost:5000/api/messages', {
          headers: {
            'Authorization': `Bearer ${token}`, // Only needed if route is protected
          },
        });

        if (!res.ok) throw new Error('Failed to fetch messages from the server.');

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#065f46',
        marginBottom: '24px'
      }}>
        📥 Contact Form Messages
      </h2>

      {error && (
        <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>
      )}

      {messages.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No messages received yet.</p>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {messages.map((msg) => (
            <div key={msg._id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <p><strong>🧑 Name:</strong> {msg.name}</p>
              <p><strong>📧 Email:</strong> {msg.email}</p>
              <p><strong>💬 Message:</strong> {msg.message}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                Submitted at: {new Date(msg.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
