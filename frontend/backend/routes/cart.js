const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // your existing verify
const Cart = require("../models/Cart");
const Course = require("../models/Course");

// ensure cart for user
async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

// GET /api/cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// POST /api/cart/add
// { courseId, paymentType: 'deposit'|'full', quantity?: 1 }
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { courseId, paymentType, quantity = 1 } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const unitPrice = paymentType === "deposit" ? course.depositPrice : course.price;

    const cart = await getOrCreateCart(req.user.id);

    // if same course + paymentType exists, increase qty
    const existing = cart.items.find(
      (i) => i.course.toString() === courseId && i.paymentType === paymentType
    );
    if (existing) existing.quantity += quantity;
    else
      cart.items.push({
        course: course._id,
        title: course.title,
        paymentType,
        unitPrice,
        quantity,
        imageUrl: course.imageUrl,
      });

    await cart.save();
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// DELETE /api/cart/item/:itemId
router.delete("/item/:itemId", verifyToken, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

// DELETE /api/cart/clear
router.delete("/clear", verifyToken, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
