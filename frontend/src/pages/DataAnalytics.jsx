import React from "react";

export default function DataAnalytics() {
  const image =
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#004D40",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          marginBottom: "20px",
          color: "#00695C",
        }}
      >
        Data Analytics
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "800px",
          lineHeight: "1.8",
          marginBottom: "40px",
          color: "#333",
        }}
      >
        Turn your data into smart business decisions.  
        At <strong>Finovative Insights</strong>, we use analytics, visualization,  
        and AI-driven models to reveal patterns, predict outcomes,  
        and fuel strategic growth for your business.
      </p>

      <img
        src={image}
        alt="Data Analytics Illustration"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "300px", // 👈 shorter height
          objectFit: "cover",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          marginBottom: "50px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {[
          {
            title: "Business Intelligence",
            text: "We turn complex data into actionable dashboards and metrics that support informed decision-making.",
          },
          {
            title: "Predictive Analytics",
            text: "Leverage statistical models to forecast trends and improve business planning accuracy.",
          },
          {
            title: "Data Visualization",
            text: "Our interactive visuals make it easy to interpret and communicate your business insights.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              background: "#E0F2F1",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: "10px",
                color: "#00796B",
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: "50px",
          padding: "14px 30px",
          borderRadius: "30px",
          border: "none",
          backgroundColor: "#009688",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#00796B")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#009688")}
      >
        Explore Insights
      </button>
    </div>
  );
}
