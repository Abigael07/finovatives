import React from "react";
import TeamCard from "../components/TeamCard";

const team = [
  { name: "Abigael Ndinda", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a4?auto=format&fit=crop&w=400&q=80" },
  { name: "Sam Mwangi", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" },
  { name: "Lilian Okoth", role: "Marketing Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { name: "Peter K", role: "Senior Accountant", image: "https://images.unsplash.com/photo-1544005310-27a0f27d9e23?auto=format&fit=crop&w=400&q=80" },
];

export default function Team() {
  return (
    <section style={{ padding: "56px 0" }}>
      <div className="container">
        <h2 style={{ color: "#00796B", marginBottom: 18 }}>Our Team</h2>
        <p style={{ marginBottom: 24, color: "#444" }}>A multidisciplinary team combining finance, engineering and design.</p>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {team.map((m, i) => <TeamCard key={i} {...m} />)}
        </div>
      </div>
    </section>
  );
}
