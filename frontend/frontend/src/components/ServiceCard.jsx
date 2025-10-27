import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCard({ title, description, image, category }) {
  return (
    <div style={{ width: 300, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", background: "#fff" }}>
      <img src={image} alt={title} style={{ width: "100%", height: 170, objectFit: "cover" }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 14, color: "#00796B", fontWeight: 700, marginBottom: 6 }}>{category || title}</div>
        <h3 style={{ margin: "6px 0 12px", fontSize: 18 }}>{title}</h3>
        <p style={{ color: "#444", marginBottom: 12 }}>{description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to={`/services?category=${encodeURIComponent(title)}`} style={{ color: "#00796B", textDecoration: "none", fontWeight: 700 }}>View</Link>
          <button style={{ background: "#00796B", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8 }}>Get Quote</button>
        </div>
      </div>
    </div>
  );
}
