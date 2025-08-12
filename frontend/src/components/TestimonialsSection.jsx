const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Grace W.",
      role: "Web Dev Student",
      text: "The classes are flexible and easy to follow. I landed my first freelance job thanks to this course!",
    },
    {
      name: "Jacob N..",
      role: "Instructor",
      text: "Teaching here has been rewarding. The tools and support make the platform seamless.",
    },
    {
      name: "Alice K.",
      role: "Data Analysis Student",
      text: "The practical assignments made all the difference. Highly recommended!",
    },
  ];

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#f1f8f7" }}>
      <h2 style={{ textAlign: "center", color: "#00796b", marginBottom: "30px" }}>
        What Our Community Says
      </h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            width: "300px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <p style={{ fontStyle: "italic", marginBottom: "10px" }}>"{t.text}"</p>
            <h4 style={{ color: "#004d40" }}>{t.name}</h4>
            <p style={{ color: "#00796b", fontSize: "14px" }}>{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TestimonialsSection;