import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const total = useMemo(
    () => (cart?.items || []).reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [cart]
  );

  return (
    <section style={{ background: "#F0FDF4", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ color: "#15803D" }}>Your Cart</h1>

        {!cart?.items?.length ? (
          <p style={{ marginTop: 12, color: "#4B5563" }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
              {cart.items.map((item) => (
                <div key={item._id} style={row}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }} />
                    ) : null}
                    <div>
                      <div style={{ fontWeight: "bold" }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: "#4B5563" }}>
                        {item.paymentType === "deposit" ? "Deposit" : "Full"} • KSh {item.unitPrice} • Qty {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => removeItem(item._id)}
                      style={{ ...btn, backgroundColor: "#0f6a2f" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18 }}>
                <strong>Total:</strong> KSh {total}
              </div>
              <div>
                <button onClick={clearCart} style={{ ...btn, marginRight: 10, backgroundColor: "#0f6a2f" }}>
                  Clear Cart
                </button>
                <button onClick={() => navigate("/checkout")} style={btn}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  padding: 12,
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const btn = {
  backgroundColor: "#15803D",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: 24,
  cursor: "pointer",
  fontWeight: "bold",
};

export default CartPage;
