const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: String,
  paymentType: { type: String, enum: ["deposit", "full"], required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentMethod: { type: String, default: "mock" }, // 'mpesa' or 'card' later
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
