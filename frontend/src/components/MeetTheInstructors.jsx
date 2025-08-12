import React from "react";
import abbyPic from "../assets/Abby.jpg";
import jacobPic from "../assets/Jacob.jpg";

const MeetTheInstructors = () => {
  const instructors = [
    {
      name: "Abigael Ndinda",
      title: "Lead Instructor - Web & Mobile",
      bio: "Passionate about empowering students through practical, real-world coding skills. 5+ years in the tech industry.",
      photo: abbyPic,
    },
    {
      name: "Jacob Ndonye",
      title: "Data Analytics Mentor",
      bio: "Helps learners make sense of numbers and land data jobs. Experienced in Python, Excel, and Power BI.",
      photo: jacobPic,
    },
  ];

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#e0f2f1" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#00796b",
          marginBottom: "30px",
          fontSize: "28px",
        }}
      >
        Meet Your Instructors
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {instructors.map((inst, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "20px",
              width: "280px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Instructor Image */}
            <img
              src={inst.photo}
              alt={inst.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
              }}
            />

            <h3 style={{ color: "#004d40", marginBottom: "5px" }}>{inst.name}</h3>
            <p
              style={{
                color: "#00796b",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {inst.title}
            </p>
            <p style={{ fontSize: "14px", color: "#333" }}>{inst.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheInstructors;
