import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const services = [
    { name: "Book Keeping", slug: "book-keeping" },
    { name: "Accounting", slug: "accounting" },
    { name: "Web Development", slug: "web-development" },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "45px",
    left: 0,
    background: "rgba(0,77,64,0.95)",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    padding: "10px 0",
    opacity: servicesOpen ? 1 : 0,
    transform: servicesOpen ? "translateY(0)" : "translateY(10px)",
    transition: "all 0.25s ease",
    pointerEvents: servicesOpen ? "auto" : "none",
    width: "200px",
  };

  const dropdownItemStyle = {
    display: "block",
    padding: "10px 20px",
    color: "#E0F2F1",
    fontWeight: 500,
    background: "transparent",
    border: "none",
    textAlign: "left",
    width: "100%",
    cursor: "pointer",
  };

  const mobileToggle = {
    fontSize: "24px",
    color: "white",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const goToService = (slug) => {
    navigate(`/services/${slug}`);
    setServicesOpen(false);
    setMobileOpen(false);
  };

  return (
    <header style={navStyle}>
      <div style={containerStyle}>
        <div style={titleStyle} onClick={() => navigate("/")}>
          Finovative Insights
        </div>

        {/* Desktop menu */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 25 }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>

          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              style={{
                ...linkStyle,
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Services
              <span
                style={{
                  marginLeft: 6,
                  transition: "transform 0.3s ease",
                  transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                }}
              >
                ▾
              </span>
            </button>

            <div style={dropdownStyle}>
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => goToService(s.slug)}
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <Link to="/about" style={linkStyle}>
            About
          </Link>

          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </nav>

        <button
          style={mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(0,77,64,0.97)",
            padding: "20px",
          }}
        >
          <Link
            to="/"
            style={{ ...linkStyle, display: "block", margin: "10px 0" }}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            style={{
              ...linkStyle,
              background: "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              margin: "10px 0",
            }}
          >
            Services ▾
          </button>

          {servicesOpen && (
            <div style={{ paddingLeft: 10 }}>
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => goToService(s.slug)}
                  style={{
                    ...dropdownItemStyle,
                    paddingLeft: 15,
                    background: "transparent",
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          <Link
            to="/about"
            style={{ ...linkStyle, display: "block", margin: "10px 0" }}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            style={{ ...linkStyle, display: "block", margin: "10px 0" }}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
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
