import React from "react";

const partners = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=60",
];

export default function PartnerSection() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h3 style={{ color: "#00796B", marginBottom: 18 }}>Trusted by</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {partners.map((p, i) => (
            <div key={i} style={{ width: 160, height: 80, borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
              <img src={p} alt={`partner-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
