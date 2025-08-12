import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#047857', color: 'white', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        {/* Logo & Description */}
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>FINOVATIVE INSIGHTS</h3>
          <p style={{ fontSize: '14px', color: '#d1d5db' }}>
            Empowering financial literacy through expert instruction, real-world case studies, and meaningful conversations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Quick Links</h4>
          <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0 }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link></li>
            <li><Link to="/messages" style={{ color: 'white', textDecoration: 'none' }}>Financial Talk</Link></li>
            <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Contact</h4>
          <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} />
              <a href="https://wa.me/254708022727" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                WhatsApp: +254 7XX XXX XXX
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <Mail size={16} />
              <a href="mailto:support@finovative.com" style={{ color: 'white', textDecoration: 'none' }}>
                support@finovative.com
              </a>
            </li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook color="white" size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram color="white" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter color="white" size={20} />
            </a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#d1d5db' }}>
        &copy; {new Date().getFullYear()} FINOVATIVE INSIGHTS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
