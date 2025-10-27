import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// same data as Home.jsx
const services = [
  {
    title: "Accounting",
    slug: "accounting",
    description:
      "Accurate books, VAT filing, payroll & tax compliance done reliably so you can focus on growth.",
    image:
      "https://images.unsplash.com/photo-1581092580493-7f66c1cae2fc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bookkeeping",
    slug: "conversion-websites",
    description:
      "High-converting websites built for sales, speed, and mobile-first performance.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Web development",
    slug: "performance-marketing",
    description:
      "Ads, funnels and tracking that turn clicks into paying customers with measurable ROI.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Brand & UI Design",
    slug: "brand-ui-design",
    description:
      "Brand identities and UI systems that feel trusted and convert users into customers.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          backgroundColor: "#f4fdfb",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "#00796B", fontWeight: 700 }}>Service not found</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 20,
            background: "linear-gradient(90deg,#00796B,#26A69A)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "60px 20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <img
        src={service.image}
        alt={service.title}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      />

      <h1
        style={{
          color: "#00796B",
          marginTop: "25px",
          fontSize: "2rem",
          fontWeight: "800",
        }}
      >
        {service.title}
      </h1>

      <p
        style={{
          fontSize: "17px",
          color: "#444",
          marginTop: "12px",
          lineHeight: "1.6",
        }}
      >
        {service.description}
      </p>

      <button
        onClick={() => navigate("/contact")}
        style={{
          marginTop: "25px",
          background: "linear-gradient(90deg,#0288d1,#26c6da)",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Get This Service
      </button>
    </div>
  );
}
