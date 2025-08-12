import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Placeholder image
const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?name=User";

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {/* Hamburger Icon */}
      <div onClick={toggleSidebar} style={{ cursor: "pointer", padding: 10 }}>
        <div style={barStyle} />
        <div style={barStyle} />
        <div style={barStyle} />
      </div>

      {/* Sidebar and Overlay */}
      {open && (
        <div style={overlayStyle} onClick={closeSidebar}>
          <div style={sidebarStyle} onClick={(e) => e.stopPropagation()}>
            {/* Profile Info */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={user?.profilePic || DEFAULT_PROFILE_PIC}
                alt="Profile"
                style={profileImageStyle}
              />
              <div style={userNameStyle}>{user?.name || "Welcome!"}</div>
              <div style={userEmailStyle}>{user?.email || "Guest user"}</div>
              <div style={userRoleStyle}>{user?.role && `(${user.role})`}</div>
            </div>

            {/* Menu Section */}
            <h3 style={menuHeaderStyle}>Menu</h3>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {user
                ? menuItem("/profile", "👤 View Profile")
                : menuItem("/auth", "👤 Login / Sign Up")}
              {menuItem("/courses", "📚 Courses")}
              {menuItem("/messages", "💬 Messages")}
              {menuItem("/financial-help", "💰 Financial Help")}
              {menuItem("/schedule", "📅 Schedule")}
              {menuItem("/support", "🆘 Help Center")}
              {menuItem("/settings", "⚙️ Settings")}

              {user && (
                <li style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                    style={logoutButtonStyle}
                  >
                    🔓 Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// === STYLE OBJECTS ===

const barStyle = {
  width: 30,
  height: 3,
  backgroundColor: "#fff",
  margin: "6px 0",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 999,
};

const sidebarStyle = {
  backgroundColor: "#e6f9f2",
  width: "260px",
  height: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  padding: "20px",
  boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.2)",
  overflowY: "auto",
};

const profileImageStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
  marginBottom: "10px",
};

const userNameStyle = {
  fontWeight: "600",
  color: "#065f46",
  fontSize: "16px",
};

const userEmailStyle = {
  fontSize: "13px",
  color: "#555",
};

const userRoleStyle = {
  fontSize: "12px",
  color: "#065f46",
  marginTop: "4px",
};

const menuHeaderStyle = {
  color: "#065f46",
  borderBottom: "1px solid #ccc",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const logoutButtonStyle = {
  backgroundColor: "#065f46",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  width: "100%",
  fontWeight: "bold",
};

// === MENU ITEM COMPONENT ===

const menuItem = (to, label) => (
  <li key={to} style={{ marginBottom: "15px" }}>
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#065f46",
        fontWeight: "500",
        padding: "8px 0",
        display: "block",
        transition: "background-color 0.2s",
        borderRadius: "8px",
        paddingLeft: "10px",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#ccf0e1")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
    >
      {label}
    </Link>
  </li>
);

export default SidebarMenu;
