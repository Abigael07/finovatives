const express = require("express");
const router = express.Router();

// Dummy cart
let cart = [];

router.get("/", (req, res) => {
  res.json(cart);
});

router.post("/", (req, res) => {
  const item = req.body;
  cart.push(item);
  res.status(201).json(item);
});

router.delete("/:id", (req, res) => {
  cart = cart.filter(i => i.id !== req.params.id);
  res.json({ message: "Item removed" });
});

module.exports = router;
