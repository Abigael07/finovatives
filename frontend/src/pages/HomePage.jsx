import React from "react";
import HeroSection from "../components/herosection";
import HeroSearch from "../components/herosearch";
import CategoryStrip from "../components/categorystrip";
import ServiceCard from "../components/servicecard";
import PartnerSection from "./partnersection";
import TeamCard from "../components/teamcard";

const servicesData = [
  {
    _id: "1",
    name: "Accounting",
    description: "Professional accounting services for your business.",
    price: "200",
    provider: { name: "Finovative Experts" },
    image: "https://images.unsplash.com/photo-1581091012184-7f71b1f0f216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
  },
  {
    _id: "2",
    name: "Web Development",
    description: "High-quality websites and applications.",
    price: "500",
    provider: { name: "Finovative Experts" },
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
  },
  {
    _id: "3",
    name: "Digital Marketing",
    description: "Grow your brand online with expert marketing.",
    price: "300",
    provider: { name: "Finovative Experts" },
    image: "https://images.unsplash.com/photo-1508385082359-fd6c5f18fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
  },
];

const teamData = [
  { name: "Abigael Ndinda", role: "Founder & CEO", photo: "https://images.unsplash.com/photo-1603415526960-f8f7d8f3e2f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "John Doe", role: "Marketing Lead", photo: "https://images.unsplash.com/photo-1603570416943-2ff1df25b844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Jane Smith", role: "Web Developer", photo: "https://images.unsplash.com/photo-1603570416943-3aa1df25b844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
];

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <HeroSearch />

      {/* Category Strip */}
      <CategoryStrip onSelect={(cat) => alert(`Filter by ${cat}`)} />

      {/* Services Section */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#00796B", marginBottom: "30px" }}>Our Top Services</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {servicesData.map(service => <ServiceCard key={service._id} service={service} />)}
        </div>
      </section>

      {/* Partner Section */}
      <PartnerSection />

      {/* Team Section */}
      <section style={{ padding: "40px 20px", textAlign: "center", backgroundColor: "#B2DFDB" }}>
        <h2 style={{ color: "#00796B", marginBottom: "30px" }}>Meet Our Team</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {teamData.map((member, i) => <TeamCard key={i} member={member} />)}
        </div>
      </section>
    </div>
  );
}
