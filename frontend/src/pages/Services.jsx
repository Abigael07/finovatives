import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Accounting",
    description:
      "Becoming a Certified Public Accountant (CPA)",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800",
  },
  {
    id: 2,
    name: "Bookkeeping",
    description:
      "Automating Reports Using Excel/Google Sheets and Preparing Financial Statements (Income Statement, Balance Sheet, Cash Flow Statement)",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    id: 3,
    name: "Web development",
    description:
      "Creating websites or web applications that run on the internet",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
  },
  
];

export default function Services() {
  const navigate = useNavigate();

  const handleExplore = (service) => {
    navigate(`/services/${service.id}`, { state: { service } });
  };

  return (
    <div
      style={{
        padding: "60px 20px",
        backgroundColor: "#f9fafb",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#00796B", marginBottom: 30 }}>Our Services</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          justifyContent: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s",
            }}
          >
            <img
              src={service.image}
              alt={service.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#004D40" }}>{service.name}</h3>
              <p style={{ color: "#555", fontSize: "15px" }}>
                {service.description}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
