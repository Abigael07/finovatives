// src/pages/InstructorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state for collapsible panels
  const [openEnrollments, setOpenEnrollments] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);

  useEffect(() => {
    // parallel fetch profile and courses
    const fetchAll = async () => {
      try {
        const [pRes, cRes, analyticsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/courses/instructor", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios
            .get("http://localhost:5000/api/analytics/instructor", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .catch(() => null),
        ]);

        setProfile(pRes?.data?.user || null);
        setCourses(Array.isArray(cRes?.data) ? cRes.data : []);
        setChartData(analyticsRes?.data || null);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  // lazy fetch panels
  const loadEnrollments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/enroll/instructor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollments(res.data || []);
    } catch (err) {
      console.error("Enrollments fetch error:", err);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages/inbox", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error("Messages fetch error:", err);
    }
  };

  const loadContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings/contact-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data || []);
    } catch (err) {
      console.error("Contacts fetch error:", err);
    }
  };

  // actions
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete course");
    }
  };

  const totalStudents = courses.reduce((s, c) => s + (c.enrolledCount || 0), 0);

  // small helpers
  const safeImage = (p) => {
    if (!p) return "https://via.placeholder.com/120x120?text=No+Image";
    return p.startsWith("http") ? p : `http://localhost:5000${p}`;
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        {/* HERO */}
        <header style={styles.hero}>
          <div style={styles.heroLeft}>
            <img
              src={safeImage(profile?.profilePic)}
              alt="Instructor avatar"
              style={styles.avatar}
            />
            <div>
              <h1 style={styles.h1}>Welcome, {profile?.name || "Instructor"} 👋</h1>
              <p style={styles.subtle}>Manage courses, view students and messages.</p>
            </div>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{courses.length}</div>
              <div style={styles.statLabel}>Courses</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{totalStudents}</div>
              <div style={styles.statLabel}>Students</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{messages.length || "—"}</div>
              <div style={styles.statLabel}>Messages</div>
            </div>
          </div>
        </header>

        {/* LAYOUT: left column (actions + panels), right column (content) */}
        <div style={styles.columns}>
          {/* LEFT: actions / quick panels */}
          <aside style={styles.leftCol}>
            <div style={styles.actionCard}>
              <button
                style={{ ...styles.primaryBtn, width: "100%" }}
                onClick={() => navigate("/upload-course")}
              >
                ➕ Upload Course
              </button>
              <button
                style={{ ...styles.ghostBtn, width: "100%", marginTop: 10 }}
                onClick={() => navigate("/profile")}
              >
                👤 Edit Profile
              </button>
            </div>

            <div style={styles.panel}>
              <div
                style={styles.panelHeader}
                onClick={async () => {
                  setOpenEnrollments((s) => !s);
                  if (!openEnrollments && enrollments.length === 0) await loadEnrollments();
                }}
              >
                <div>🧑‍🎓 Enrollments</div>
                <div style={styles.caret}>{openEnrollments ? "▲" : "▼"}</div>
              </div>
              {openEnrollments && (
                <div style={styles.panelBody}>
                  {enrollments.length === 0 ? (
                    <div style={styles.emptySmall}>No enrollments yet.</div>
                  ) : (
                    enrollments.map((e, i) => (
                      <div key={i} style={styles.smallRow}>
                        <div style={{ fontWeight: 600 }}>{e.studentName}</div>
                        <div style={styles.smallMuted}>{e.courseTitle}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div style={styles.panel}>
              <div
                style={styles.panelHeader}
                onClick={async () => {
                  setOpenMessages((s) => !s);
                  if (!openMessages && messages.length === 0) await loadMessages();
                }}
              >
                <div>💬 Messages</div>
                <div style={styles.caret}>{openMessages ? "▲" : "▼"}</div>
              </div>
              {openMessages && (
                <div style={styles.panelBody}>
                  {messages.length === 0 ? (
                    <div style={styles.emptySmall}>No messages yet.</div>
                  ) : (
                    messages.map((m, i) => (
                      <div key={i} style={styles.smallRow}>
                        <div style={{ fontWeight: 600 }}>{m.user?.name || "Unknown"}</div>
                        <div style={styles.smallMuted}>{m.lastMessage}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div style={styles.panel}>
              <div
                style={styles.panelHeader}
                onClick={async () => {
                  setOpenContacts((s) => !s);
                  if (!openContacts && contacts.length === 0) await loadContacts();
                }}
              >
                <div>📥 Contacts</div>
                <div style={styles.caret}>{openContacts ? "▲" : "▼"}</div>
              </div>
              {openContacts && (
                <div style={styles.panelBody}>
                  {contacts.length === 0 ? (
                    <div style={styles.emptySmall}>No contact submissions.</div>
                  ) : (
                    contacts.map((c, i) => (
                      <div key={i} style={styles.smallRow}>
                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                        <div style={styles.smallMuted}>{c.message}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT: main content */}
          <main style={styles.rightCol}>
            {/* Courses grid */}
            <section style={{ marginBottom: 28 }}>
              <h2 style={styles.sectionTitle}>Your Courses</h2>
              {loading ? (
                <div style={styles.empty}>Loading courses…</div>
              ) : courses.length === 0 ? (
                <div style={styles.empty}>You haven't uploaded any courses yet.</div>
              ) : (
                <div style={styles.grid}>
                  {courses.map((course) => (
                    <article key={course._id} style={styles.courseCard}>
                      <div style={styles.cardTop}>
                        <div style={styles.courseTitle}>{course.title}</div>
                        <div style={styles.courseMeta}>{course.category || "General"}</div>
                      </div>

                      <p style={styles.courseDesc}>
                        {course.description ? course.description.slice(0, 120) : "No description."}
                        {course.description && course.description.length > 120 ? "…" : ""}
                      </p>

                      <div style={styles.cardActions}>
                        <div>
                          {course.pdfUrl && (
                            <button
                              onClick={() => window.open(`http://localhost:5000${course.pdfUrl}`, "_blank")}
                              style={styles.smallAction}
                            >
                              📄 PDF
                            </button>
                          )}
                          {course.link && (
                            <button
                              onClick={() => window.open(course.link, "_blank")}
                              style={{ ...styles.smallAction, background: "#1976d2" }}
                            >
                              🔗 Link
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/courses/${course._id}`)}
                            style={{ ...styles.smallAction, background: "#0b74de" }}
                          >
                            📘 Details
                          </button>
                        </div>

                        <div>
                          <button
                            onClick={() => navigate(`/edit-course/${course._id}`)}
                            style={styles.editSmall}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            style={styles.deleteSmall}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Analytics */}
            <section>
              <h2 style={styles.sectionTitle}>Analytics</h2>
              {!chartData ? (
                <div style={styles.empty}>No analytics available.</div>
              ) : (
                <div style={styles.analyticsRow}>
                  <div style={styles.analyticsCard}>
                    <h4 style={{ marginBottom: 8 }}>Enrollments per Course</h4>
                    <Bar
                      data={{
                        labels: chartData.enrollments.map((e) => e.title),
                        datasets: [
                          {
                            label: "Enrollments",
                            data: chartData.enrollments.map((e) => e.count),
                            backgroundColor: "#4caf50",
                          },
                        ],
                      }}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </div>
                  <div style={styles.analyticsCard}>
                    <h4 style={{ marginBottom: 8 }}>Monthly Uploads</h4>
                    <Line
                      data={{
                        labels: Object.keys(chartData.uploads),
                        datasets: [
                          {
                            label: "Uploads",
                            data: Object.values(chartData.uploads),
                            borderColor: "#2196f3",
                            fill: false,
                          },
                        ],
                      }}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

/* ---------- styles ---------- */
const styles = {
  page: {
    background: "#f6f8fa",
    minHeight: "100vh",
    paddingBottom: 60,
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 40px",
    maxWidth: 1200,
    margin: "24px auto",
    background: "white",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
  },
  heroLeft: { display: "flex", alignItems: "center", gap: 18 },
  avatar: { width: 84, height: 84, borderRadius: 12, objectFit: "cover", border: "4px solid #e8f5e9" },
  h1: { margin: 0, fontSize: 22 },
  subtle: { margin: 0, color: "#606f7b" },
  statsRow: { display: "flex", gap: 14 },
  statCard: {
    minWidth: 96,
    padding: "12px 16px",
    background: "#f1f8f3",
    borderRadius: 10,
    textAlign: "center",
  },
  statNumber: { fontSize: 18, fontWeight: 700 },
  statLabel: { fontSize: 12, color: "#4b5563" },

  columns: {
    display: "flex",
    gap: 24,
    maxWidth: 1200,
    margin: "20px auto",
    padding: "0 20px",
  },
  leftCol: { width: 300, display: "flex", flexDirection: "column", gap: 16 },
  rightCol: { flex: 1 },

  actionCard: {
    background: "white",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(2,6,23,0.04)",
  },
  primaryBtn: {
    background: "#2e7d32",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },
  ghostBtn: {
    background: "transparent",
    border: "1px solid #ddd",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },

  panel: {
    background: "white",
    borderRadius: 10,
    padding: 0,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(2,6,23,0.04)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 14px",
    cursor: "pointer",
    fontWeight: 700,
    alignItems: "center",
  },
  panelBody: { padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 },
  caret: { opacity: 0.7 },
  smallRow: { display: "flex", flexDirection: "column", gap: 4, paddingBottom: 6 },
  smallMuted: { color: "#626d71", fontSize: 13 },
  emptySmall: { color: "#7a8489", fontStyle: "italic", fontSize: 13 },

  sectionTitle: { margin: "0 0 12px 0", color: "#1b5e20" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },

  courseCard: {
    background: "linear-gradient(180deg,#ffffff,#fbfffb)",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(17,24,39,0.04)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 160,
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 },
  courseTitle: { fontWeight: 800 },
  courseMeta: { fontSize: 12, color: "#6b7280" },
  courseDesc: { color: "#374151", marginTop: 8, fontSize: 14 },
  cardActions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 },

  smallAction: {
    background: "#d1e8ff",
    color: "#083d77",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    marginRight: 8,
    fontWeight: 700,
  },
  editSmall: {
    background: "#fff4e6",
    border: "1px solid #ffd28a",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    marginRight: 8,
  },
  deleteSmall: {
    background: "#ffe9e9",
    border: "1px solid #f5a6a6",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },

  analyticsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  analyticsCard: {
    height: 260,
    background: "white",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.04)",
  },

  empty: {
    padding: 20,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 6px 12px rgba(2,6,23,0.04)",
    color: "#6b7280",
  },
};

export default InstructorDashboard;
