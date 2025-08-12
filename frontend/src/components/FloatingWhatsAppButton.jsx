import React, { useEffect, useState } from 'react';

const FloatingWhatsAppButton = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = "https://wa.me/254712345678?text=Hello! I'm interested in your courses.";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 1000,
        flexDirection: "row-reverse" // icon on far right
      }}
    >
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#25D366",
          padding: "15px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          viewBox="0 0 24 24"
          width="28px"
          height="28px"
        >
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0a11.92 11.92 0 0 0-10 18.86L0 24l5.32-1.74A11.91 11.91 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zm-8.5 17.24c-2.13 0-4.24-.58-6.07-1.68l-.43-.26-3.15 1.03 1.03-3.09-.28-.46A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.17 1.04 7.07 2.93A9.95 9.95 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.16-7.7c-.28-.14-1.65-.81-1.91-.9s-.44-.14-.63.14-.72.9-.89 1.08-.33.21-.61.07a8.3 8.3 0 0 1-2.45-1.51 9.3 9.3 0 0 1-1.74-2.19c-.18-.31 0-.48.13-.62.14-.13.31-.34.46-.52.15-.17.2-.29.3-.48.1-.19.05-.36 0-.5s-.63-1.51-.86-2.07c-.23-.55-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01s-.5.07-.76.36c-.26.29-1 1-1 2.45s1.03 2.84 1.17 3.04c.14.2 2.03 3.1 4.92 4.34.69.3 1.22.47 1.64.6.69.22 1.31.19 1.8.12.55-.08 1.65-.67 1.89-1.31.23-.63.23-1.17.16-1.29-.06-.12-.25-.18-.52-.32z" />
        </svg>
      </a>

      {/* Message Bubble (text) */}
      {showBubble && (
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#25D366", // WhatsApp green text
            padding: "12px 16px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "14px",
            fontWeight: "500",
            opacity: showBubble ? 1 : 0,
            transform: showBubble ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.6s ease"
          }}
        >
          Got any questions? <br /> Chat with us on WhatsApp
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsAppButton;
