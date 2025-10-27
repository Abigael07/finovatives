import React, { useState, useEffect } from "react";

export default function FAQSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const mode = localStorage.getItem("darkMode") === "true";
    setDarkMode(mode);

    const handleDarkModeChange = () => {
      const updatedMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(updatedMode);
    };

    window.addEventListener("darkModeChange", handleDarkModeChange);
    return () => window.removeEventListener("darkModeChange", handleDarkModeChange);
  }, []);

  const faqs = [
    {
      question: "What services does Finovative Insights offer?",
      answer:
        "We provide web development, accounting systems setup, and digital marketing solutions — all tailored for startups and small enterprises.",
    },
    {
      question: "Can I request a custom web application?",
      answer:
        "Absolutely! We specialize in bespoke web apps designed to match your brand and business needs perfectly.",
    },
    {
      question: "Do you provide financial consultancy?",
      answer:
        "Yes, we do. Our experienced team helps startups manage bookkeeping, financial reporting, and budgeting efficiently.",
    },
    {
      question: "How can I contact Finovative Insights?",
      answer:
        "You can reach us through our contact page or via WhatsApp — we’re available Monday to Saturday, 9 AM to 6 PM.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const sectionStyle = {
    background: darkMode ? "#eee": "#f9fdfb",
    color: darkMode ? "#eee" : "#333",
    padding: "80px 20px",
    transition: "all 0.3s ease",
  };

  const cardStyle = (isOpen) => ({
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#ddd" : "#333",
    marginBottom: 14,
    borderRadius: 10,
    boxShadow: darkMode
      ? "0 3px 8px rgba(0,0,0,0.5)"
      : "0 3px 8px rgba(0,150,136,0.2)",
    transition: "all 0.3s ease",
    overflow: "hidden",
    cursor: "pointer",
    transform: isOpen ? "scale(1.01)" : "scale(1)",
  });

  const questionStyle = {
    padding: "16px 18px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: darkMode ? "#80CBC4" : "#00796B",
  };

  const answerStyle = (isOpen) => ({
    maxHeight: isOpen ? "400px" : "0px",
    opacity: isOpen ? 1 : 0,
    transition: "all 0.5s ease",
    padding: isOpen ? "0 18px 18px" : "0 18px",
    color: darkMode ? "#ccc" : "#555",
  });

  return (
    <section style={sectionStyle}>
      <div
        className="container"
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            //color: darkMode ? "#4FC3F7" : "#00796B",
            marginBottom: 40,
            fontSize: 28,
          }}
        >
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              style={cardStyle(isOpen)}
              onClick={() => toggleFAQ(index)}
            >
              <div style={questionStyle}>
                <span>{faq.question}</span>
                <span
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    fontSize: 22,
                    transition: "transform 0.3s ease",
                    color: darkMode ? "#ccc" : "#555",
                  }}
                >
                  +
                </span>
              </div>
              <div style={answerStyle(isOpen)}>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
