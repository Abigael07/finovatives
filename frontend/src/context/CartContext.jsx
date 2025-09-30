import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (e) {
      console.error("Fetch cart error:", e);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async ({ courseId, paymentType, quantity = 1 }) => {
    const { data } = await api.post("/cart/add", { courseId, paymentType, quantity });
    setCart(data);
  };

  const removeItem = async (itemId) => {
    const { data } = await api.delete(`/cart/item/${itemId}`);
    setCart(data);
  };

  const clearCart = async () => {
    const { data } = await api.delete("/cart/clear");
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = { cart, loading, fetchCart, addToCart, removeItem, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
