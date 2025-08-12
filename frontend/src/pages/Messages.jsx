import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AuthForm.css';

const Messages = () => {
  const defaultInstructorId = '688b745961978c6ebe5eb76b';
  const { userId } = useParams();
  const targetUserId = userId || defaultInstructorId;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/messages/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMessages(res.data));
  }, [targetUserId]);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!input.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/messages`, {
        receiverId: targetUserId,
        content: input
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, res.data]);
      setInput('');
    } catch (err) {
      alert('Failed to send message.');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h3 style={styles.header}>📬 Chat</h3>

        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.sender === currentUserId ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === currentUserId ? '#d1fae5' : '#e0f2fe',
                color: '#111827'
              }}
            >
              <span style={styles.messageText}>{msg.content}</span>
            </div>
          ))}
        </div>

        <div style={styles.inputBar}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    fontSize: '24px',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: '20px'
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  },
  message: {
    maxWidth: '75%',
    padding: '10px 14px',
    borderRadius: '12px',
    wordWrap: 'break-word',
    fontSize: '15px'
  },
  messageText: {
    display: 'inline-block'
  },
  inputBar: {
    marginTop: '16px',
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    outlineColor: '#2563eb'
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Messages;
