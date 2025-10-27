import React, { useState, useEffect } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [appAlerts, setAppAlerts] = useState(true);
  const [password, setPassword] = useState("");

  // Persist dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "#121212";
      document.body.style.color = "#e0e0e0";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.background = "#f9fdfc";
      document.body.style.color = "#333";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        display: "block",
        width: "100%",
        padding: "12px 16px",
        textAlign: "left",
        border: "none",
        borderRadius: "8px",
        background:
          activeTab === id
            ? "linear-gradient(135deg,#00796B,#00BFA5)"
            : "transparent",
        color: activeTab === id ? "#fff" : darkMode ? "#ccc" : "#444",
        fontWeight: activeTab === id ? "600" : "500",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow:
          activeTab === id
            ? "0 3px 10px rgba(0,0,0,0.1)"
            : "none",
      }}
      onMouseOver={(e) => {
        if (activeTab !== id)
          e.target.style.background = darkMode
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.04)";
      }}
      onMouseOut={(e) => {
        if (activeTab !== id) e.target.style.background = "transparent";
      }}
    >
      {label}
    </button>
  );

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 50,
        height: 26,
        borderRadius: 20,
        backgroundColor: checked ? "#00796B" : "#888",
        position: "relative",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#fff",
          position: "absolute",
          top: 2,
          left: checked ? 26 : 2,
          transition: "0.3s",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );

  const cardStyle = {
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#e0e0e0" : "#333",
    borderRadius: 10,
    padding: 20,
    boxShadow: darkMode
      ? "0 6px 20px rgba(255,255,255,0.05)"
      : "0 6px 20px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div>
            <h3 style={{ color: "#00BFA5", marginBottom: 20 }}>
              Notifications
            </h3>
            <div style={{ ...cardStyle, display: "grid", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4>Email Alerts</h4>
                  <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 14 }}>
                    Receive updates and news via email.
                  </p>
                </div>
                <Toggle checked={emailAlerts} onChange={setEmailAlerts} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4>In-App Notifications</h4>
                  <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 14 }}>
                    Get real-time updates while logged in.
                  </p>
                </div>
                <Toggle checked={appAlerts} onChange={setAppAlerts} />
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div>
            <h3 style={{ color: "#00BFA5", marginBottom: 20 }}>Security</h3>
            <div style={cardStyle}>
              <div style={{ marginBottom: 20 }}>
                <h4>Change Password</h4>
                <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 14 }}>
                  Choose a strong password with at least 8 characters.
                </p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    marginTop: 10,
                    fontSize: 15,
                  }}
                />
                <button
                  onClick={() => alert("Password updated successfully!")}
                  style={{
                    background: "#00796B",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 8,
                    marginTop: 15,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  Update Password
                </button>
              </div>

              <div>
                <h4>Two-Factor Authentication</h4>
                <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 14 }}>
                  Add an extra layer of security to your account.
                </p>
                <button
                  style={{
                    background: "#0288D1",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 8,
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div>
            <h3 style={{ color: "#00BFA5", marginBottom: 20 }}>Preferences</h3>
            <div style={cardStyle}>
              <p style={{ color: darkMode ? "#bbb" : "#555", lineHeight: 1.8 }}>
                Personalize your Finovative Insights experience with customized
                defaults and saved preferences.
              </p>
              <div style={{ marginTop: 20 }}>
                <label style={{ fontWeight: 600 }}>Default Landing Page</label>
                <select
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    marginTop: 10,
                    background: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#e0e0e0" : "#333",
                  }}
                >
                  <option>Home</option>
                  <option>Services</option>
                  <option>Profile</option>
                  <option>Inbox</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div>
            <h3 style={{ color: "#00BFA5", marginBottom: 20 }}>Appearance</h3>
            <div style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4>Dark Mode</h4>
                  <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 14 }}>
                    Switch between light and dark interface themes.
                  </p>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: darkMode ? "#121212" : "#f9fdfc",
        minHeight: "100vh",
        padding: "60px 20px",
        color: darkMode ? "#e0e0e0" : "#333",
        transition: "background 0.4s ease, color 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            flex: "1 1 250px",
            background: darkMode ? "#1e1e1e" : "#fff",
            borderRadius: 12,
            boxShadow: darkMode
              ? "0 6px 20px rgba(255,255,255,0.05)"
              : "0 6px 20px rgba(0,0,0,0.06)",
            padding: 20,
            height: "fit-content",
          }}
        >
          <h3 style={{ color: "#00BFA5", marginBottom: 20 }}>Settings</h3>
          <TabButton id="notifications" label="🔔 Notifications" />
          <TabButton id="security" label="🔒 Security" />
          <TabButton id="preferences" label="⚙️ Preferences" />
          <TabButton id="appearance" label="🎨 Appearance" />
        </div>

        {/* Main Content */}
        <div style={{ flex: "3 1 600px", minWidth: 300 }}>{renderContent()}</div>
      </div>
    </div>
  );
}
