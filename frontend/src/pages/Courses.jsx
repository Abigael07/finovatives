import React from "react";

export default function Courses() {
  const courses = [
    {
      title: "Financial Literacy Masterclass",
      desc: "Understand budgeting, saving, and smart financial planning for individuals and startups.",
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Investment & Stock Market Basics",
      desc: "A beginner-friendly guide to understanding markets, risk, and long-term wealth building.",
      img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Entrepreneurship & Business Growth",
      desc: "Learn to identify business opportunities, craft strategies, and scale sustainably.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Personal Tax Management",
      desc: "Master the principles of tax planning and compliance to manage your income effectively.",
      img: "https://images.unsplash.com/photo-1581093588401-22a0b3d13e3d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Digital Finance & Fintech Trends",
      desc: "Explore digital transformation in finance, mobile money systems, and fintech innovation.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Advanced Corporate Finance",
      desc: "Dive deep into capital structuring, valuations, and business financial management.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8fafb", padding: "80px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            color: "#003C43",
            marginBottom: "20px",
          }}
        >
          Our Courses
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto 50px auto",
          }}
        >
          Learn from professionals and master your financial journey. These
          courses are designed for students, entrepreneurs, and professionals
          who want to level up their knowledge in finance and business.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={course.img}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    color: "#006d77",
                    fontSize: "1.3rem",
                    marginBottom: "10px",
                  }}
                >
                  {course.title}
                </h3>
                <p style={{ color: "#555", fontSize: "0.95rem" }}>
                  {course.desc}
                </p>
                <button
                  style={{
                    backgroundColor: "#009879",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    marginTop: "15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#007b64")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#009879")
                  }
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
