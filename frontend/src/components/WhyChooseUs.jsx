import React from "react";

const WhyChooseUs = () => {
  const sectionStyle = {
    backgroundColor: "#f0fdf4", // very light green background
    padding: "60px 16px",
    textAlign: "center"
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#047857",
    marginBottom: "40px"
  };

  const cardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto"
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    border: "1px solid #d1fae5"
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#065f46",
    marginBottom: "12px"
  };

  const textStyle = {
    fontSize: "14px",
    color: "#334155",
    lineHeight: "1.6"
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Why FINOVATIVE INSIGHTS?</h2>
      <div style={cardsContainer}>
        <div style={cardStyle}>
          <h3 style={titleStyle}>Real Financial Knowledge</h3>
          <p style={textStyle}>
            We provide practical courses that blend financial theory with real-world applications,
            helping you understand how money works in everyday life.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Instructor Guidance</h3>
          <p style={textStyle}>
            Ask questions, get feedback, and connect directly with our verified instructors
            through our built-in Financial Talk system or WhatsApp.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Book & Course Integration</h3>
          <p style={textStyle}>
            Access PDF financial books, enroll in interactive lessons, and track your learning progress
            — all in one place.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Modern, Accessible Design</h3>
          <p style={textStyle}>
            Enjoy a smooth and visually appealing experience built for both desktop and mobile.
            No clutter — just clean, professional design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
