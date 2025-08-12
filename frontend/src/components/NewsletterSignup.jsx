const NewsletterSignup = () => {
  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#f0f9f7", textAlign: "center" }}>
      <h2 style={{ color: "#00796b", marginBottom: "20px" }}>Join Our Newsletter</h2>
      <p style={{ marginBottom: "20px" }}>Get updates on new courses, events, and offers.</p>
      <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={{
            padding: "10px",
            width: "250px",
            maxWidth: "90%",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#00796b",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
export default NewsletterSignup;