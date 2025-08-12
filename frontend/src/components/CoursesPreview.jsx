import { useEffect, useState } from "react";
import axios from "axios";

const CoursesPreview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleWhatsAppEnquiry = (courseTitle) => {
    const phoneNumber = "254712345678"; // Replace with your WhatsApp number
    const message = `Hello, I'm interested in the course: "${courseTitle}". Could you provide more details?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section style={{ backgroundColor: "#F0FDF4", padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#15803D",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Explore Our Courses
        </h2>

        {courses.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            No courses available right now.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {courses.map((course) => (
              <div
                key={course._id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Image (optional) */}
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                )}

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#047857",
                    marginBottom: "10px",
                  }}
                >
                  {course.title || "Untitled Course"}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "#4B5563",
                    fontSize: "0.95rem",
                    marginBottom: "10px",
                  }}
                >
                  {course.description || "No description provided."}
                </p>

                {/* Instructor */}
                <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
                  👨‍🏫 <strong>Instructor:</strong>{" "}
                  {course.instructor?.name || "Unknown"}
                </p>

                {/* WhatsApp Enquiry Button */}
                <button
                  onClick={() => handleWhatsAppEnquiry(course.title)}
                  style={{
                    backgroundColor: "#25D366",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "25px",
                    border: "none",
                    fontWeight: "bold",
                    //marginTop: "auto",
                    cursor: "pointer",
                    marginTop: "15px",
                  }}
                >
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesPreview;
