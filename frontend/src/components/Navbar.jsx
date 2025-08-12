import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import SidebarMenu from './SidebarMenu';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#065f46',
      color: 'white',
      padding: '16px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        {/* Logo and Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <img
            src={logo}
            alt="Finovative Logo"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              marginRight: '10px',
              boxShadow: '0 0 5px rgba(0,0,0,0.3)'
            }}
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Finovative Insights
          </span>
        </Link>

        {/* ✅ Only show 4 nav links now */}
        <div className="nav-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/courses" style={navLinkStyle}>Courses</Link>
          <Link to="/about" style={navLinkStyle}>About</Link>
          <Link to="/help" style={blueButtonStyle}>Financial Help</Link>
        </div>

        {/* Sidebar (Hamburger Menu) */}
        <div className="hamburger-icon" style={{ display: 'block' }}>
          <SidebarMenu />
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  backgroundColor: '#047857',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '999px',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'background-color 0.3s',
};

const blueButtonStyle = {
  ...navLinkStyle,
  backgroundColor: '#1e88e5',
};
