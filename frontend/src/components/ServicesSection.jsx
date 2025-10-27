import React from "react";

function ServicesSection() {
  const services = [
    {
      title: "Financial Literacy Courses",
      desc: "Learn budgeting, saving, and investing like a pro.",
      img: "https://images.unsplash.com/photo-1581093588401-22d88c9a1e9e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Business Mentorship",
      desc: "Get personalized mentorship from finance experts.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "E-Books and Resources",
      desc: "Access curated PDFs and e-learning materials.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const sectionStyle = {
    padding: "80px 60px",
    textAlign: "center",
  };

  const gridStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  };

  const cardStyle = {
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "0.3s",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: "20px 0 10px",
  };

  return (
    <section id="courses" style={sectionStyle}>
      <h2 style={{ color: "#00796b", fontSize: "2rem", marginBottom: "40px" }}>
        Our Services
      </h2>
      <div style={gridStyle}>
        {services.map((s, index) => (
          <div key={index} style={cardStyle}>
            <img src={s.img} alt={s.title} style={imgStyle} />
            <div style={{ padding: "20px" }}>
              <h3 style={titleStyle}>{s.title}</h3>
              <p style={{ color: "#555" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
