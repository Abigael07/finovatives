import React from "react";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        backgroundColor: "#FFFFFF",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "40px",
        flexWrap: "wrap", // ensures mobile responsiveness
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          textAlign: "left",
          minWidth: "300px",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "#065F46",
            marginBottom: "20px",
          }}
        >
          Welcome to{" "}
          <span style={{ color: "#1D4ED8" }}>FINOVATIVE INSIGHTS</span>
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            color: "#374151",
            marginBottom: "30px",
          }}
        >
          Your Gateway to Financial Literacy & Innovation
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/254708022727?text=Hi! I'm interested in learning more about your courses."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M380.9 97.1C339-9.1 216.2-27.1 130.1 33.6c-86.1 60.7-111 177.3-56.8 267.7L3.4 497.6c-5.2 9.6 4.4 20.3 14.1 15.2l201.5-101.2c81.6 25.9 172.9-11.1 214.7-92.9 41.9-81.9 19.6-180.7-52.8-221.6zM224 374.6c-39.1 0-75.5-12.4-105.5-33.4L71.7 378l36.8-72.1c-18-30.8-25.8-67.4-20.6-104.2 13.4-93.2 121.2-145.1 210.1-95.4s106.7 170.7 36.2 239.3c-25.1 24.2-59.3 37-95.2 37z" />
            </svg>
            Chat with Instructor
          </a>

          {/* Explore Button */}
          <a
            href="#explore"
            style={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <img
          src={heroImage}
          alt="Finance"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
