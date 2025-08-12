import React from 'react';

const CoursePricingSection = () => {
  const whatsappNumber = "254708022727"; 

  const courses = [
    { title: "Web Development", price: "KES 25,000" },
    { title: "Data Analysis", price: "KES 30,000" },
    { title: "Digital Marketing", price: "KES 20,000" }
  ];

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#f0f9f7" }}>
      <h2 style={{ textAlign: "center", color: "#00796b", marginBottom: "30px" }}>Course Pricing</h2>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
        {courses.map((course, index) => {
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello! I'm interested in your ${course.title} course.`)}`;
          return (
            <div key={index} style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "20px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#004d40" }}>{course.title}</h3>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#009688" }}>{course.price}</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#095c29ff", 
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Enquire Now
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoursePricingSection;
