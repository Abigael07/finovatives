import React from "react";

export default function AboutSection({ title = "About us", text, image }) {
  return (
    <section style={{ padding: "56px 0" }}>
      <div className="container" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 350px" }}>
          <h2 style={{ color: "#00796B", marginBottom: 12 }}>{title}</h2>
          <p style={{ color: "#444", lineHeight: 1.6 }}>{text}</p>
        </div>
        <div style={{ flex: "1 1 350px" }}>
          <img src={image || "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=900&q=80"} alt="about" style={{ width: "100%", borderRadius: 12 }} />
        </div>
      </div>
    </section>
  );
}
