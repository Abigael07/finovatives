import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CoursesPreview from "../components/CoursesPreview";
import FinancialTalkSection from "../components/FinancialTalkSection";
import CoursePricingSection from "../components/CoursePricingSection";
import LearningScheduleSection from "../components/LearningScheduleSection";
import TestimonialsSection from "../components/TestimonialsSection";
import MeetTheInstructors from "../components/MeetTheInstructors";
import NewsletterSignup from "../components/NewsletterSignup";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import AuthPromptModal from "../components/AuthPromptModal"; 
import aboutImage from "../assets/about.jpg";

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Show popup after 1 second (you can adjust)
    const timer = setTimeout(() => {
      setShowAuthModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <WhyChooseUs />

      {/* ✅ Stylish Visual Break Section */}
      <section
        style={{
          backgroundColor: "#f0fdf4",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={aboutImage}
          alt="Finovative students in action"
          style={{
            width: "90%",
            maxWidth: "800px",
            height: "auto",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          }}
        />
        <p
          style={{
            marginTop: "20px",
            fontSize: "1.1rem",
            color: "#047857",
            fontWeight: "500",
            maxWidth: "700px",
          }}
        >
          “We don’t just teach — we guide, mentor, and empower our learners to build real-world solutions.”
        </p>
      </section>

      <CoursesPreview />
      <FinancialTalkSection />
      <CoursePricingSection />
      <LearningScheduleSection />
      <TestimonialsSection />
      <MeetTheInstructors />
      <NewsletterSignup />
      <FloatingWhatsAppButton />
      <CTASection />
      <Footer />

      {/* ✅ Auth Prompt Modal */}
      {showAuthModal && <AuthPromptModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Home;
