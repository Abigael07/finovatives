const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Enrollment = require("../models/Enrollment");

// POST /api/orders/checkout  -> create an order from current cart
router.post("/checkout", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((i) => ({
        course: i.course,
        title: i.title,
        paymentType: i.paymentType,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
      })),
      totalAmount,
      status: "pending",
      paymentMethod: "mock",
    });

    res.json({ order, paymentHint: "Use /api/orders/:id/complete to simulate payment" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Checkout failed" });
  }
});

// POST /api/orders/:id/complete  -> mock complete payment
router.post("/:id/complete", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status === "paid") return res.json(order);

    order.status = "paid";
    await order.save();

    // create enrollments
    const enrollments = await Promise.all(
      order.items.map((i) =>
        Enrollment.create({
          user: order.user,
          course: i.course,
          order: order._id,
          paymentType: i.paymentType,
          amountPaid: i.unitPrice * i.quantity,
          status: "active",
        })
      )
    );

    // clear cart
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ order, enrollments });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Payment completion failed" });
  }
});

module.exports = router;
