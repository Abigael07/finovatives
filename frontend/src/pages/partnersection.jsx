import React from "react";
import PartnerSection from "../components/partnersection";

export default function PartnerSectionPage() {
  return (
    <div style={{ padding: "56px 0" }}>
      <div className="container">
        <h2 style={{ color: "#00796B", marginBottom: 18 }}>Partners & Clients</h2>
        <p style={{ color: "#444", marginBottom: 20 }}>We work with ambitious brands and local companies to deliver measurable results.</p>
        <PartnerSection />
      </div>
    </div>
  );
}
