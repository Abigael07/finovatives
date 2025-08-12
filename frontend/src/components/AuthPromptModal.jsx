// src/components/AuthPromptModal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPromptModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "120px", // moved up so it won't cover WhatsApp floating button
        right: "30px",
        background: "linear-gradient(135deg, #4cafef, #3cb371)",
        padding: "20px",
        borderRadius: "50px", // oval shape
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        color: "#fff",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "300px",
      }}
    >
      <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Do you have an account?</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "8px 16px",
            background: "#fff",
            color: "#3cb371",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "8px 16px",
            background: "#fff",
            color: "#4cafef",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthPromptModal;
