import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const token = localStorage.getItem('token');
  //const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages/inbox', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Error fetching inbox:', err);
      }
    };

    fetchInbox();
  }, [token]);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.header}>📥 Message Inbox</h2>

        {conversations.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul style={styles.list}>
            {conversations.map((conv, i) => {
              const other = conv.user;
              return (
                <li key={i} style={styles.item}>
                  <Link to={`/messages/${other._id}`} style={styles.link}>
                    <strong>{other.name}</strong>
                    <p style={styles.preview}>{conv.lastMessage}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    fontSize: '24px',
    color: '#1e3a8a',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#1e293b',
  },
  preview: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '4px',
  },
};

export default Inbox;
