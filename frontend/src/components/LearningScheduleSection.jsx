import React from "react";

const LearningScheduleSection = () => {
  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#e0f2f1" }}>
      <h2 style={{ textAlign: "center", color: "#00796b", marginBottom: "30px" }}>Learning Schedule</h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        {[
          { type: "Weekday", time: "Mon – Fri, 5:00 PM – 6:00 PM" },
          { type: "Weekend", time: "Saturday, 10:00 AM – 1:00 PM" }
        ].map((slot, index) => (
          <div key={index} style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            width: "280px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#004d40" }}>{slot.type}</h3>
            <p style={{ fontSize: "16px", color: "#00695c" }}>{slot.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningScheduleSection;
