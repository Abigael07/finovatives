// backend/routes/sellers.js
import express from 'express';
const router = express.Router();
import Seller from "../models/seller.js";
import Product from '../models/Product.js';

router.get('/', async (req,res) => {
  const sellers = await Seller.find().sort({name:1});
  res.json(sellers);
});

router.get('/:id', async (req,res) => {
  const seller = await Seller.findById(req.params.id);
  if(!seller) return res.status(404).json({message:'Not found'});
  const products = await Product.find({ sellerId: seller._id }).limit(30);
  res.json({ seller, products });
});

router.post('/', async (req,res) => {
  const s = new Seller(req.body);
  await s.save();
  res.json(s);
});

export default router;
