import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryStrip({ categories = [] }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "28px 0", background: "#F1F8F7" }}>
      <div className="container" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => navigate(`/services?category=${encodeURIComponent(cat)}`)}
            style={{
              background: "#00796B",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
