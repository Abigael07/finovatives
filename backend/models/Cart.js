const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: String,
    paymentType: { type: String, enum: ["deposit", "full"], required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    imageUrl: String,
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
