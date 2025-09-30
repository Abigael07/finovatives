import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const PaymentPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load course", err);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    if (!selectedTime) {
      alert("⚠️ Please select a learning time before continuing.");
      return;
    }

    try {
      // Ask user for M-Pesa number
      const phone = prompt(
        "📱 Enter your M-Pesa phone number (format: 2547XXXXXXXX):"
      );
      if (!phone) return;

      // Call backend to trigger M-Pesa STK Push
      const res = await axios.post("http://localhost:5000/api/mpesa/stkpush", {
        phone,
        amount: 1000, // KES 1000 fixed for now
        accountReference: course.title,
      });

      console.log("STK Push Response:", res.data);

      alert("✅ Check your phone to complete the payment via M-Pesa.");

      // TODO: Save enrollment after backend callback confirms payment
      navigate("/dashboard");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("❌ Payment request failed. Please try again.");
    }
  };

  const timeOptions = [
    "Mon–Fri: 5:00 PM – 6:00 PM",
    "Sat–Sun: 10:00 AM – 1:00 PM",
  ];

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (!course)
    return (
      <p style={{ padding: "40px", color: "red" }}>Course not found.</p>
    );

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ fontSize: "24px", color: "#065f46" }}>
          Enroll in: {course.title}
        </h2>

        <p style={{ marginTop: "10px", fontSize: "16px", color: "#374151" }}>
          Price: <strong>KES 1,000</strong>
        </p>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="timeSelect" style={{ fontWeight: "bold" }}>
            Choose your learning time:
          </label>
          <select
            id="timeSelect"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <option value="">-- Select Time Slot --</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePayment}
          style={{
            marginTop: "30px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </div>
    </>
  );
};

export default PaymentPage;
