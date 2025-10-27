import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import HeroSearch from "../components/HeroSearch";
import CategoryStrip from "../components/CategoryStrip";
import AboutSection from "../components/AboutSection";
import PartnerSection from "../components/partnersection";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function Home() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Accounting",
      slug: "accounting",
      description:
        "Recording Assets, Liabilities, and Equity and Preparing Financial Statements (Income Statement, Balance Sheet, Cash Flow Statement.", 
      image:
        "https://images.unsplash.com/photo-1581092580493-7f66c1cae2fc?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Bookkeeping",
      slug: "conversion-websites",
      description:
        "Accurate books, VAT filing, payroll & tax compliance done reliably so you can focus on growth.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Web development",
      slug: "performance-marketing",
      description:
        "creating websites or web applications that run on the internet.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    },
    
  ];

  const categories = services.map((s) => s.title);

  function goToService(slug) {
    navigate(`/services/${slug}`);
  }

  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
        background: "#f7fdfa",
      }}
    >
      <HeroSection />
      <HeroSearch />
      <CategoryStrip categories={categories} />

      <main>
        {/* Services Section */}
        <section
          id="services"
          style={{
            padding: "64px 20px",
            maxWidth: 1160,
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2
              style={{
                margin: 0,
                color: "#00695C",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              Our Services & Solutions
            </h2>
            <p style={{ marginTop: 10, color: "#184f4a", fontSize: 15 }}>
              Pick a solution to learn more — each includes a scope, deliverables
              and next steps.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 22,
              alignItems: "stretch",
            }}
          >
            {services.map((s) => (
              <article
                key={s.slug}
                role="button"
                tabIndex={0}
                onClick={() => goToService(s.slug)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && goToService(s.slug)
                }
                style={{
                  background: "#ffffff",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 14px 40px rgba(1,73,66,0.06)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 28px 80px rgba(1,73,66,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(1,73,66,0.06)";
                }}
              >
                <div style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23e6faf6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23007766' font-size='18'%3Eimage%20unavailable%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flexGrow: 1,
                  }}
                >
                  <h3 style={{ margin: 0, color: "#003d36", fontSize: 18 }}>
                    {s.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "#2b5b58",
                      fontSize: 14,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Single Action Button */}
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
  onClick={() => navigate(`/services/${s.slug}`)}
  style={{
    background: "linear-gradient(90deg, #0288d1, #26c6da)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.2s ease",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Explore More
</button>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <AboutSection
          title="Why Finovative?"
          text="We mix accounting clarity, conversion-first websites, and data-driven marketing to give small teams measurable growth."
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        />

        {/* Partners */}
        <PartnerSection />
      </main>
    </div>
  );
}
