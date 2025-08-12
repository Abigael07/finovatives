import React from "react";

const FinancialTalkSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#E6FFFA",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#047857", fontSize: "2rem", marginBottom: "20px" }}>
        Need Financial Assistance?
      </h2>
      <p style={{ color: "#065F46", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 30px" }}>
        Connect with our expert instructors and get personalized financial guidance through one-on-one chats.
      </p>
      <a href="https://wa.me/254708022727" target="_blank" rel="noopener noreferrer">
        <button
          style={{
            backgroundColor: "#047857",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "12px 24px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Chat Now on WhatsApp
        </button>
      </a>
    </section>
  );
};

export default FinancialTalkSection;
