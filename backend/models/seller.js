// backend/models/Seller.js
const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  description: String,
  profilePic: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seller', SellerSchema);
