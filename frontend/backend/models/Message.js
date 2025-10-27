// backend/models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
