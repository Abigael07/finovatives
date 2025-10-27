// src/pages/AllServicesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/services") // ✅ backend route
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services:", err));
  }, []);

  const styles = {
    wrapper: {
      background:
        "linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)",
      minHeight: "100vh",
      paddingBottom: "70px",
    },
    hero: {
      textAlign: "center",
      padding: "80px 20px 50px 20px",
      background:
        "linear-gradient(135deg, #00796b 0%, #0288d1 100%)",
      color: "white",
      borderBottomLeftRadius: "50px",
      borderBottomRightRadius: "50px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "15px",
    },
    heroText: {
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontSize: "1.1rem",
    },
    container: {
      padding: "50px 8%",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
    },
    card: {
      background: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    imgContainer: {
      overflow: "hidden",
      height: "200px",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.4s ease",
    },
    info: {
      padding: "20px",
      textAlign: "center",
    },
    name: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#004d40",
      marginBottom: "10px",
    },
    description: {
      fontSize: "0.95rem",
      color: "#444",
      marginBottom: "15px",
    },
    price: {
      color: "#00796b",
      fontWeight: "bold",
      fontSize: "1rem",
      marginBottom: "15px",
    },
    btn: {
      background:
        "linear-gradient(90deg, #0288d1 0%, #26c6da 100%)",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "transform 0.2s ease, box-shadow 0.3s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* 🌿 Top Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Explore Our Services</h1>
        <p style={styles.heroText}>
          Discover a variety of high-quality services designed to make your life easier.
          From expert consultations to hands-on support — we’ve got you covered.
        </p>
      </div>

      {/* 🧩 Services Grid */}
      <div style={styles.container}>
        <div style={styles.grid}>
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.1)";
                }}
              >
                <div style={styles.imgContainer}>
                  <img
                    src={service.image || "/images/default.jpg"}
                    alt={service.name}
                    style={styles.img}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{service.name}</h3>
                  <p style={styles.description}>
                    {service.description.length > 90
                      ? service.description.slice(0, 90) + "..."
                      : service.description}
                  </p>
                  <p style={styles.price}>KES {service.price}</p>
                  <button
                    style={styles.btn}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() => navigate(`/services/${service._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: "#555",
                marginTop: "40px",
              }}
            >
              Loading services...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
