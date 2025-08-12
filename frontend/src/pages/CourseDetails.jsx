import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError("Failed to load course details");
      }
    };
    fetchCourse();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ color: "#2563eb" }}>{course.title}</h1>
        <p><strong>Instructor:</strong> {course.instructorName}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Content:</strong> {course.content}</p>
        <p><strong>Schedule:</strong> {course.schedule}</p>
        <p><strong>Format:</strong> {course.format}</p>
        <p><strong>Duration:</strong> {course.duration}</p>

        {course.link && (
          <p>
            <strong>Link:</strong>{" "}
            <a href={course.link} target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a" }}>
              Open Link
            </a>
          </p>
        )}

        {course.pdf && (
          <p>
            <strong>PDF:</strong>{" "}
            <a
              href={`http://localhost:5000/${course.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#16a34a" }}
            >
              View / Download PDF
            </a>
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Enroll Now
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
