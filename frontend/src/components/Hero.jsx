import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const image =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay" />
      <div className="hero-inner container">
        <h1>Trusted financial advice & learning — tailored to you</h1>
        <p style={{ maxWidth: 760, margin: "12px auto 18px", fontSize: 18 }}>
          Finovative combines expert instruction, practical courses and advisory
          support to help individuals and businesses make smarter financial
          decisions.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/services"
            style={{
              background: "white",
              color: "var(--finov-blue)",
              padding: "12px 18px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Explore Services
          </Link>
          <Link
            to="/contact"
            style={{
              border: "2px solid white",
              color: "white",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
