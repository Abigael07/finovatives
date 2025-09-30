import React, { useEffect, useState } from "react";
import heroVideo from "../assets/website.webm";
import heroPoster from "../assets/hero-poster.jpg"; // fallback image

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "70vh", // not full screen, leaves space for other sections
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: "0 20px",
        zIndex: 1, // keeps it above the video but below other sections
      }}
    >
      {/* Background Video or Fallback Image */}
      {isMobile ? (
        <img
          src={heroPoster}
          alt="Hero background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
          }}
        />
      ) : (
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div style={{ zIndex: 2, maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Welcome to{" "}
          <span style={{ color: "#60A5FA" }}>FINOVATIVE INSIGHTS</span>
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
          }}
        >
          Your Gateway to Financial Literacy & Innovation
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://wa.me/254708022727?text=Hi! I'm interested in learning more about your courses."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Chat with Instructor
          </a>

          <a
            href="#explore"
            style={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
 