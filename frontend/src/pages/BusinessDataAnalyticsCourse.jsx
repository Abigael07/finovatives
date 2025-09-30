import React, { useState } from "react";
import heroImage from "../assets/hero.jpg";
import Navbar from "../components/Navbar";

const BusinessDataAnalyticsCourse = () => {
  const [paying, setPaying] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = "254708022727";
    const message = `Hello, I'm interested in the Business Data Analytics course offered by Finovative Insights. Could you provide more details?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const normalizeMsisdn = (input) => {
    if (!input) return null;
    let msisdn = String(input).replace(/\D/g, "");
    if (msisdn.startsWith("0")) msisdn = "254" + msisdn.slice(1);
    if (!/^2547\d{8}$/.test(msisdn)) return null;
    return msisdn;
  };

  const handlePayment = async (amount) => {
    try {
      let phone = window.prompt(
        "Enter M-Pesa number (format: 2547XXXXXXXX)",
        "254708022727"
      );
      phone = normalizeMsisdn(phone);
      if (!phone) {
        alert("Invalid phone. Use format 2547XXXXXXXX");
        return;
      }

      setPaying(true);
      setStatusText("Initiating M-Pesa STK Push…");

      const res = await fetch("http://localhost:5000/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          phoneNumber: phone,
          courseId: "business-data-analytics",
          accountReference: "FINOVATIVE-BDA",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Payment initiation failed");
      }

      const { checkoutRequestID, customerMessage } = data;
      setStatusText(customerMessage || "Complete the prompt on your phone…");

      // Poll status every 3s
      const poll = async () => {
        try {
          const sRes = await fetch(
            `http://localhost:5000/api/payments/status/${checkoutRequestID}`
          );
          const sData = await sRes.json();

          if (sData.status === "PENDING") {
            setTimeout(poll, 3000);
            return;
          }

          if (sData.status === "SUCCESS") {
            setStatusText("Payment successful ✅");
            alert("Payment successful ✅");
          } else {
            setStatusText(`Payment ${sData.status}. ${sData.message || ""}`);
            alert(`Payment ${sData.status}. ${sData.message || ""}`);
          }
        } catch (e) {
          setStatusText("Error checking payment status.");
          console.error(e);
        } finally {
          setPaying(false);
        }
      };

      poll();
    } catch (e) {
      console.error(e);
      alert(e.message || "Payment error");
      setPaying(false);
      setStatusText("");
    }
  };

  return (
    <>
      <Navbar /> 
    <section style={{ backgroundColor: "#F0FDF4", padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Left Column: Text */}
          <div style={{ flex: "1 1 500px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#15803D" }}>
              Business Data Analytics
            </h1>
            <p style={{ color: "#047857", fontSize: "1.2rem", marginTop: "10px" }}>
              Unlock the Power of Data
            </p>
            <p style={{ color: "#4B5563", marginTop: "20px" }}>
              Learn how to analyze business data and make data-driven decisions using
              Excel, SQL, and Power BI. Gain practical skills to transform raw data into
              actionable insights for business growth.
            </p>

            {/* Instructor Info */}
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#047857" }}>Instructor</h3>
              <p><strong>Finovative Insights Team</strong></p>
              <p style={{ color: "#4B5563" }}>
                Our expert team brings real-world experience to guide you through the course,
                ensuring you gain practical and applicable skills.
              </p>
            </div>
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

        {/* Pricing & Payment */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Left Column: Pricing */}
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ color: "#047857" }}>Pricing</h2>
            <p style={{ fontSize: "1.2rem" }}>
              <del>KSh 10,000</del>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>KSh 9,000</span>
            </p>
            <div style={{ marginTop: "20px" }}>
              <button
                style={buttonStyle}
                disabled={paying}
                onClick={() => handlePayment(4500)} // Deposit
              >
                {paying ? "Processing…" : "Pay Deposit"}
              </button>
              <button
                style={buttonStyle}
                disabled={paying}
                onClick={() => handlePayment(9000)} // Full
              >
                {paying ? "Processing…" : "Pay Full Amount"}
              </button>
            </div>
            {statusText ? (
              <p style={{ marginTop: 10, color: "#4B5563" }}>{statusText}</p>
            ) : null}
          </div>

          {/* Right Column: Contact */}
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ color: "#047857" }}>Contact Us</h2>
            <p>
              Email:{" "}
              <a href="mailto:kiminza.ndonye@gmail.com">kiminza.ndonye@gmail.com</a>
            </p>
            <p>Phone: 0708022727</p>
            <p>
              WhatsApp:{" "}
              <a href="https://wa.me/254708022727" target="_blank" rel="noreferrer">
                Click to Chat
              </a>
            </p>
            <button
              onClick={handleWhatsAppEnquiry}
              style={{ ...buttonStyle, marginTop: "15px" }}
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Optional: Course Topics / Modules */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ color: "#047857", marginBottom: "15px" }}>What You'll Learn</h2>
          <ul style={{ color: "#4B5563", paddingLeft: "20px" }}>
            <li>Data Collection and Preparation</li>
            <li>Data Visualization Techniques</li>
            <li>Descriptive, Predictive, and Prescriptive Analytics</li>
            <li>Business Intelligence Tools</li>
            <li>Data-Driven Decision-Making Models</li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
};

const buttonStyle = {
  backgroundColor: "#15803D",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "25px",
  border: "none",
  fontWeight: "bold",
  margin: "10px 10px 0 0",
  cursor: "pointer",
};

export default BusinessDataAnalyticsCourse;
