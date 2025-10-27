import React, { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Abigael Ndinda",
    email: "abigaelndinda7@gmail.com",
    role: "Founder & Admin",
    bio: "Founder — building fintech-friendly web apps and reliable bookkeeping systems for small businesses and entrepreneurs.",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a4?auto=format&fit=crop&w=400&q=80",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Profile saved successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUser({ ...user, avatar: event.target.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#f9fdfc",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #00796B 0%, #00BFA5 50%, #0288D1 100%)",
          padding: "80px 20px 100px",
          textAlign: "center",
          color: "#fff",
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "6px" }}>My Profile</h1>
        <p style={{ fontSize: "15px", opacity: 0.9 }}>
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div
        style={{
          maxWidth: "900px",
          margin: "-80px auto 60px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          padding: "40px 30px",
          position: "relative",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            position: "relative",
          }}
        >
          <img
            src={user.avatar}
            alt="Profile Avatar"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          />

          <div style={{ marginTop: "14px" }}>
            <label
              htmlFor="upload"
              style={{
                backgroundColor: "#00796B",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00BFA5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#00796B")}
            >
              Upload Picture
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* User Info */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#00796B",
              marginBottom: "5px",
            }}
          >
            {user.name}
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: "25px" }}>
            {user.role}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600,
                  color: "#444",
                }}
              >
                Full Name
              </label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: isEditing ? "1px solid #00BFA5" : "1px solid #ddd",
                  backgroundColor: isEditing ? "#f9fffd" : "#f7f7f7",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600,
                  color: "#444",
                }}
              >
                Email
              </label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: isEditing ? "1px solid #00BFA5" : "1px solid #ddd",
                  backgroundColor: isEditing ? "#f9fffd" : "#f7f7f7",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600,
                  color: "#444",
                }}
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows={4}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: isEditing ? "1px solid #00BFA5" : "1px solid #ddd",
                  backgroundColor: isEditing ? "#f9fffd" : "#f7f7f7",
                  fontSize: "15px",
                  resize: "none",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#0288D1",
                color: "#fff",
                border: "none",
                padding: "12px 30px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#007AB8")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0288D1")}
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#00796B",
                color: "#fff",
                border: "none",
                padding: "12px 30px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00BFA5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#00796B")}
            >
              Save Profile
            </button>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 60px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          padding: "40px 30px",
          lineHeight: "1.8",
        }}
      >
        <h3 style={{ color: "#00796B", marginBottom: "10px" }}>About Me</h3>
        <p style={{ color: "#555" }}>
          {user.bio ||
            "I am passionate about innovation, data, and helping businesses navigate financial and digital transformation. I enjoy working with founders to turn ideas into actionable strategies, and I’m always exploring new tech to simplify financial operations."}
        </p>
      </div>
    </div>
  );
}
