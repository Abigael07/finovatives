import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: `url("hero-poster.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "100px 0",
      }}
    >
      <div
        className="container"
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 30,
          padding: "0 20px",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: 44, marginBottom: 16 }}>
            Grow your business with Finovative Insights
          </h1>

          <p style={{ fontSize: 18, marginBottom: 24, color: "#E0F2F1" }}>
            We pair accounting excellence with modern web and marketing solutions
            — built for African businesses and global ambitions.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <Link
              to="/services"
              style={{
                background: "#00796B",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Explore Services
            </Link>

            <a
              href="/contact"
              style={{
                background: "transparent",
                border: "2px solid #fff",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 10,
              padding: 16,
              color: "#00332b",
            }}
          >
            <h4 style={{ marginBottom: 10 }}>Popular services</h4>

            <ul style={{ marginTop: 10, display: "grid", gap: 8 }}>
              <li>
                <strong>Accounting</strong> — Bookkeeping, tax & payroll
              </li>
              <li>
                <strong>Web Development</strong> — Websites, eCommerce, apps
              </li>
              <li>
                <strong>Bookkeeping</strong> — Daily financial management
              </li>
              <li>
                <strong>Data Analytics</strong> - Data Analysis
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
