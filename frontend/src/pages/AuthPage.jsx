import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthPage = () => {
  const [isLogin] = useState(true);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.box}>
          <h2 style={styles.header}>
            {isLogin ? "Login to your account" : "Create a new account"}
          </h2>

          <div style={styles.formWrapper}>
            {isLogin ? <LoginPage embedded /> : <RegisterPage embedded />}
          </div>

          
        </div>
      </div>

      <Footer />
    </>
  );
};

// === INLINE STYLES ===
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 20px",
    minHeight: "90vh",
    backgroundColor: "#f0fdf4",
  },
  box: {
    backgroundColor: "#ffffff",
    padding: "35px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "480px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#065f46",
    fontFamily: "Segoe UI, sans-serif",
  },
  formWrapper: {
    marginBottom: "15px",
  },
  toggleText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
    marginTop: "10px",
  },
  link: {
    color: "#065f46",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AuthPage;
