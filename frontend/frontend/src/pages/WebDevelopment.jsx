import React from "react";

export default function WebDevelopment() {
  return (
    <div style={{ padding: "100px 20px", background: "#f7fdfd", minHeight: "100vh" }}>
      <h1 style={{ color: "#0288d1", textAlign: "center" }}>Web Development</h1>
      <p style={{ maxWidth: "800px", margin: "20px auto", lineHeight: 1.6, textAlign: "center" }}>
        We build high-performance, conversion-driven websites using modern frameworks. From design to deployment,
        our focus is on speed, responsiveness, and measurable impact for your business.
      </p>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
          alt="Web Development"
          style={{ maxWidth: "90%", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}
        />
      </div>
    </div>
  );
}
