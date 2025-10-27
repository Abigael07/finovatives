// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required:true },
  description: String,
  price: Number,
  unit: String,
  image: String,
  location: String,
  category: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref:'Seller' },
  createdAt: { type: Date, default: Date.now }
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);