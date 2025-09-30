import React, { useMemo, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const total = useMemo(
    () => (cart?.items || []).reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [cart]
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/orders/checkout");
      setOrder(data.order);
    } catch (e) {
      alert("Checkout failed.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMockPay = async () => {
    if (!order) return;
    try {
      setLoading(true);
      const { data } = await api.post(`/orders/${order._id}/complete`);
      // refresh cart (will be cleared)
      await fetchCart();
      alert("Payment successful! You are enrolled.");
      navigate("/"); // or navigate to dashboard
    } catch (e) {
      alert("Payment completion failed.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ background: "#F0FDF4", padding: "40px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ color: "#15803D" }}>Checkout</h1>

        {!cart?.items?.length ? (
          <p style={{ marginTop: 12, color: "#4B5563" }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ marginTop: 20, background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#047857" }}>Order Summary</h3>
              <ul style={{ marginTop: 10 }}>
                {cart.items.map((i) => (
                  <li key={i._id} style={{ marginBottom: 8, color: "#4B5563" }}>
                    {i.title} — {i.paymentType === "deposit" ? "Deposit" : "Full"} — KSh {i.unitPrice} × {i.quantity}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 10, fontWeight: "bold" }}>Total: KSh {total}</div>
            </div>

            {!order ? (
              <button onClick={handleCheckout} style={{ ...btn, marginTop: 16 }} disabled={loading}>
                {loading ? "Processing..." : "Checkout"}
              </button>
            ) : (
              <div style={{ marginTop: 16 }}>
                <div style={{ color: "#4B5563", marginBottom: 8 }}>
                  Order created. (Mock) Click “Complete Payment” to simulate payment.
                </div>
                <button onClick={handleMockPay} style={btn} disabled={loading}>
                  {loading ? "Completing..." : "Complete Payment"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const btn = {
  backgroundColor: "#15803D",
  color: "#fff",
  padding: "12px 22px",
  border: "none",
  borderRadius: 26,
  cursor: "pointer",
  fontWeight: "bold",
};

export default CheckoutPage;
