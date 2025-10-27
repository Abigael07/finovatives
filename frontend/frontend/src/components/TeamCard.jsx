import React from "react";

export default function TeamCard({ name, role, image }) {
  return (
    <div style={{ width: 220, textAlign: "center", padding: 16, borderRadius: 12, background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <img src={image} alt={name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px" }} />
      <h4 style={{ margin: 0, color: "#00796B" }}>{name}</h4>
      <p style={{ marginTop: 6, color: "#666" }}>{role}</p>
    </div>
  );
}
