import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div style={{ padding: "80px 0", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: 700, margin: "0 auto", background: "#fff", padding: 30, borderRadius: 12 }}>
        <h2 style={{ color: "#00796B" }}>Thank you!</h2>
        <p style={{ color: "#444", marginTop: 12 }}>We received your message — a member of our team will contact you soon.</p>
        <div style={{ marginTop: 18 }}>
          <Link to="/" style={{ textDecoration: "none", padding: "10px 16px", background: "#00796B", color: "#fff", borderRadius: 8 }}>Back to home</Link>
        </div>
      </div>
    </div>
  );
}
