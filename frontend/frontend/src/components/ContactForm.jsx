// src/components/ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Handle failed responses
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
      }

      // Try parsing JSON safely
      const data = await res.json().catch(() => {
        throw new Error("Invalid JSON response from server");
      });

      console.log("Message sent:", data);
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error submitting contact form:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        required
        style={textareaStyle}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#006d77aa" : "#006d77",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 15,
};

const textareaStyle = {
  ...inputStyle,
  resize: "none",
};
