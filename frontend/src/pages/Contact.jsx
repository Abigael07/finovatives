import React, { useState } from "react";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#00796B", marginBottom: "40px" }}>Contact Us</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center" }}>
        {/* Contact Form */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div style={{ flex: "1", minWidth: "300px", color: "#004D40" }}>
          <h3 style={{ marginBottom: "20px" }}>Get in touch</h3>
          <p>Email: info@finovative.com</p>
          <p>Phone: +254 704 955 384</p>
          <p>Address: Nairobi, Kenya</p>

          <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>Find Us on Map</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.391741586777!2d36.80356860000001!3d-1.2920651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a2f05f9b05%3A0x7cbd8ff6f4b4d0a!2sNairobi!5e0!3m2!1sen!2ske!4v1600000000000!5m2!1sen!2ske"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            title="Finovative Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
