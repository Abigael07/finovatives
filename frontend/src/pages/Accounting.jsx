import React from "react";

export default function Accounting() {
  return (
    <div style={{ padding: "100px 20px", background: "#f0fbf9", minHeight: "100vh" }}>
      <h1 style={{ color: "#00796B", textAlign: "center" }}>Accounting Services</h1>
      <p style={{ maxWidth: "800px", margin: "20px auto", lineHeight: 1.6, textAlign: "center" }}>
        Comprehensive accounting and reporting services for small to medium enterprises.
        We manage tax filing, reconciliation, and financial statement preparation with accuracy and efficiency.
      </p>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
          alt="Accounting"
          style={{ maxWidth: "90%", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}
        />
      </div>
    </div>
  );
}
