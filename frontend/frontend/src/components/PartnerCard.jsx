import React from "react";

export default function PartnerCard({ image }) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={image} alt="Partner" style={{ height: "50px" }} />
    </div>
  );
}
