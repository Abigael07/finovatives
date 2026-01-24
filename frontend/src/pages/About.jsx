import React from "react";

export default function About() {
  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
        backgroundColor: "#f7fdfa",
        color: "#003d36",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            padding: "40px 20px",
            borderRadius: "12px",
          }}
        >
          <h1 style={{ fontSize: "40px", marginBottom: "15px", fontWeight: 800 }}>
            About Finovative Insights
          </h1>
          <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
            We merge innovation and finance to empower businesses with clarity,
            creativity, and confidence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "80px auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80"
          alt="Our Story"
          style={{
            width: "100%",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        />
        <div>
          <h2 style={{ color: "#00695C", fontSize: "28px", marginBottom: "15px" }}>
            Our Story
          </h2>
          <p style={{ lineHeight: "1.7", color: "#184f4a" }}>
            Finovative Insights was born out of a simple idea: to help startups
            and growing businesses navigate financial growth with creativity and
            clarity. We combine data, design, and digital strategy to deliver
            transformative results for every client we serve.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section
        style={{
          backgroundColor: "#e6faf6",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "30px", color: "#00695C", marginBottom: "20px" }}>
          Our Mission
        </h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "17px",
            color: "#184f4a",
            lineHeight: "1.7",
          }}
        >
          To empower individuals and businesses through financial intelligence,
          innovative design, and digital solutions that drive sustainable growth.
        </p>

        <div
          style={{
            marginTop: "50px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            marginInline: "auto",
          }}
        >
          {[
            {
              title: "Integrity",
              desc: "We maintain transparency and trust in every partnership.",
              icon: "💎",
            },
            {
              title: "Innovation",
              desc: "Creative solutions tailored for modern financial challenges.",
              icon: "💡",
            },
            {
              title: "Impact",
              desc: "Our work helps clients make measurable progress and growth.",
              icon: "🚀",
            },
          ].map((v) => (
            <div
              key={v.title}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "30px 20px",
                boxShadow: "0 10px 30px rgba(1,73,66,0.06)",
              }}
            >
              <div style={{ fontSize: "36px" }}>{v.icon}</div>
              <h3 style={{ color: "#00695C", marginTop: "10px" }}>{v.title}</h3>
              <p style={{ color: "#2b5b58", fontSize: "15px" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "80px auto",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h2 style={{ color: "#00695C", fontSize: "30px", marginBottom: "20px" }}>
          Meet Our Team
        </h2>
        <p
          style={{
            color: "#184f4a",
            maxWidth: "700px",
            margin: "0 auto 40px",
            fontSize: "17px",
          }}
        >
          Our diverse team of experts in finance, design, and technology bring
          passion and precision to everything we do.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              name: "Jacob Ndonye",
              role: "Founder & CEO",
              img: "Jacob.jpg", // place Abby.jpg inside public or src/assets
            },
            {
              name: "John Mwangi",
              role: "Lead Developer",
              img: "Jacob.jpg",
            },
            {
              name: "Grace Wambui",
              role: "Marketing Director",
              img: "Abby.jpg",
            },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                background: "white",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(1,73,66,0.06)",
                textAlign: "center",
              }}
            >
              <img
                src={t.img}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: 0, color: "#003d36" }}>{t.name}</h3>
                <p style={{ color: "#2b5b58", fontSize: "15px" }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
