import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#004D40", color: "#E0F2F1", padding: "30px 0", marginTop: 40 }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between" }}>
        <div style={{ minWidth: 220 }}>
          <h3 style={{ color: "#A7FFEB" }}>Finovative Insights</h3>
          <p style={{ marginTop: 8 }}> • Web Development  • Bookkeeping • Design </p>
        </div>

        <div style={{ minWidth: 220 }}>
          <h4 style={{ color: "#A7FFEB" }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            <a href="/" style={{ color: "#E0F2F1", textDecoration: "none" }}>Home</a>
            <a href="/services" style={{ color: "#E0F2F1", textDecoration: "none" }}>Services</a>
            <a href="/about" style={{ color: "#E0F2F1", textDecoration: "none" }}>About</a>
            <a href="/contact" style={{ color: "#E0F2F1", textDecoration: "none" }}>Contact</a>
          </div>
        </div>

        <div style={{ minWidth: 220 }}>
          <h4 style={{ color: "#A7FFEB" }}>Contact</h4>
          <p style={{ marginTop: 8 }}>Nairobi, Kenya</p>
          <p style={{ marginTop: 6 }}>info@finovative.com</p>
          <p style={{ marginTop: 6 }}>+254 704 955 384</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 13 }}>© {new Date().getFullYear()} Finovative Insights. All rights reserved.</div>
    </footer>
  );
}
