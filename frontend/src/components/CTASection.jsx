import React, { useState, useEffect } from "react";

const CTASection = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-08-10T23:59:59");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div
      style={{
        backgroundColor: "#e0f8f0",
        color: "#004d40",
        padding: "40px 20px",
        textAlign: "center",
        marginTop: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>
        ⏳ Applications close in:
      </h2>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {timeLeft.days}d : {formatTime(timeLeft.hours)}h :{" "}
        {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
      </div>
      <p style={{ marginTop: "15px" }}>
        Don’t miss your chance to join the next cohort!
      </p>

      {/* ✅ WhatsApp Enquire Now Button */}
      <a
        href="https://wa.me/254708022727?text=Hi! I'm interested in joining the upcoming cohort. Please tell me more."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "15px",
          display: "inline-block",
          backgroundColor: "#0c4922ff",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Enquire Now on WhatsApp
      </a>
    </div>
  );
};

export default CTASection;
