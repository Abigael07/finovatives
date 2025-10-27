import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSearch() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // simple search: navigate to services with q param
    navigate(`/services?q=${encodeURIComponent(term)}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <form onSubmit={submit} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search services, e.g. 'accounting'"
          style={{ padding: "10px 14px", width: 320, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button style={{ padding: "10px 16px", background: "#00796B", color: "#fff", border: "none", borderRadius: 8 }}>Search</button>
      </form>
    </div>
  );
}
