import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled
      ? "linear-gradient(90deg,#00796B,#004D40)"
      : "linear-gradient(90deg,#009688,#00796B)",
    transition: "all 0.3s ease",
    boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
    color: "white",
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle = {
    fontWeight: "800",
    fontSize: 20,
    color: "white",
    cursor: "pointer",
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#B2DFDB" : "white",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  });

  const mobileToggle = {
    fontSize: "24px",
    color: "white",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  return (
    <header style={navStyle}>
      <div style={containerStyle}>
        <div style={titleStyle} onClick={() => navigate("/")}>
          Finovative Insights
        </div>

        {/* Desktop menu */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 25 }}>
          <Link to="/services/book-keeping" style={linkStyle("/services/book-keeping")}>
            Book Keeping
          </Link>
          <Link to="/services/accounting" style={linkStyle("/services/accounting")}>
            Accounting
          </Link>
          <Link to="/services/web-development" style={linkStyle("/services/web-development")}>
            Web Development
          </Link>
          <Link to="/services/data-analytics" style={linkStyle("/services/data-analytics")}>
            Data Analytics
          </Link>
          <Link to="/about" style={linkStyle("/about")}>
            About
          </Link>
          <Link to="/contact" style={linkStyle("/contact")}>
            Contact
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          style={mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{ background: "rgba(0,77,64,0.97)", padding: "20px" }}>
          {[
            { name: "Book Keeping", path: "/services/book-keeping" },
            { name: "Accounting", path: "/services/accounting" },
            { name: "Web Development", path: "/services/web-development" },
            { name: "Data Analytics", path: "/services/data-analytics" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...linkStyle(item.path),
                display: "block",
                margin: "10px 0",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .desktop-nav { display: none; }
        }
        @media (min-width: 851px) {
          button[style*="font-size: 24px"] { display: none; }
        }
      `}</style>
    </header>
  );
}
