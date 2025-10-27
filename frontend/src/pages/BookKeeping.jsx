import React from "react";

export default function BookKeeping() {
  return (
    <div style={{ padding: "100px 20px", background: "#f5faf8", minHeight: "100vh" }}>
      <h1 style={{ color: "#009688", textAlign: "center" }}>Bookkeeping Services</h1>
      <p style={{ maxWidth: "800px", margin: "20px auto", lineHeight: 1.6, textAlign: "center" }}>
        We help businesses maintain accurate financial records, manage payroll, and stay compliant with
        tax regulations. Our team ensures your books are clear, up-to-date, and ready for growth decisions.
      </p>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
          alt="Bookkeeping"
          style={{ maxWidth: "90%", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}
        />
      </div>
    </div>
  );
}
