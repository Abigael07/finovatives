import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Team from "./pages/Team";
import PartnerSectionPage from "./pages/partnersection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ThankYou from "./pages/Thankyou";
import ServiceDetails from "./pages/ServiceDetails"; 
import AllServicesPage from "./pages/AllServicesPage";
import BookKeeping from "./pages/BookKeeping";
import Accounting from "./pages/Accounting";
import WebDevelopment from "./pages/WebDevelopment";


export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} /> {/* ✅ New dynamic route */}
          <Route path="/team" element={<Team />} />
          <Route path="/partnersection" element={<PartnerSectionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/services" element={<AllServicesPage />} />
          <Route path="/services/book-keeping" element={<BookKeeping />} />
          <Route path="/services/accounting" element={<Accounting />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />

          
        </Routes>
      </main>
      <Footer />
    </>
  );
}
