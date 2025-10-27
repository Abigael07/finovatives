import React from "react";

export default function ProductDetail() {
  const service = {
    name: "Web Development",
    description: "We create responsive, high-quality websites and applications for businesses of all sizes.",
    price: "500",
    provider: "Finovative Experts",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
  };

  return (
    <div style={{ padding: "40px 20px", display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
      <div style={{ flex: "1 1 400px" }}>
        <img
          src={service.image}
          alt={service.name}
          style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: "1 1 400px" }}>
        <h2 style={{ color: "#00796B", marginBottom: "20px" }}>{service.name}</h2>
        <p style={{ marginBottom: "15px" }}>{service.description}</p>
        <p style={{ fontWeight: "bold", marginBottom: "20px" }}>Price: ${service.price}</p>
        <p style={{ fontStyle: "italic", marginBottom: "20px" }}>Provider: {service.provider}</p>
        <button
          style={{ backgroundColor: "#00796B", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px" }}
          onClick={() => alert("Booking functionality coming soon")}
        >
          Book Service
        </button>
      </div>
    </div>
  );
}
