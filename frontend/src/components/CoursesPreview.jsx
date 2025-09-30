import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.jpg"; // Make sure the path matches your folder structure

const CoursesPreview = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/course/business-data-analytics");
  };

  return (
    <section style={{ backgroundColor: "#F0FDF4", padding: "60px 20px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Left Column: Text */}
        <div style={{ flex: "1 1 500px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#15803D" }}>
            Business Data Analytics
          </h1>
          <p
            style={{
              color: "#047857",
              fontSize: "1.25rem",
              marginTop: "10px",
              fontWeight: "500",
            }}
          >
            Transform Data into Actionable Insights
          </p>
          <p style={{ color: "#4B5563", marginTop: "20px", lineHeight: "1.6" }}>
            Unlock the power of business data and make smarter decisions. Gain practical
            skills in Excel, SQL, Power BI, and more to analyze real-world datasets and
            drive business growth.
          </p>

          {/* Instructor Info */}
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#047857", marginBottom: "5px" }}>Instructor</h3>
            <p><strong>Finovative Insights Team</strong></p>
            <p style={{ color: "#4B5563" }}>
              Experienced professionals guiding you step-by-step through real-world
              business analytics projects.
            </p>
          </div>

          {/* Learn More Button */}
          <button
            onClick={handleLearnMore}
            style={{
              marginTop: "30px",
              backgroundColor: "rgba(5, 14, 8, 1)",
              color: "#ffffff",
              padding: "12px 25px",
              borderRadius: "25px",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
          >
            Learn More About the Course
          </button>
        </div>

        {/* Right Column: Image */}
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <img
            src={heroImage}
            alt="Business Data Analytics"
            style={{ width: "100%", borderRadius: "16px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
