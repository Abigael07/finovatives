export default function FinancialHelpSection() {
  return (
    <section
      style={{
        //backgroundColor: '#e0f2fe',
        color: '#1e3a8a',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <h2 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '16px',
        letterSpacing: '0.5px',
      }}>
        Need Financial Guidance?
      </h2>

      <p style={{
        fontSize: '18px',
        maxWidth: '700px',
        margin: '0 auto 24px auto',
        lineHeight: '1.6',
      }}>
        Whether you need help paying for a course, managing farm finances, or accessing tailored support — Finovative Insights is here to help. Reach out and take a step toward financial empowerment.
      </p>

      <a
        href="https://wa.me/254708022727"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          //backgroundColor: '#2563eb',
          color: 'white',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        Chat With an Advisor
      </a>
    </section>
  );
}
