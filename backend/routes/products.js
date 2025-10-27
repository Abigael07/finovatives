// backend/routes/products.js
import express from'express';
const router = express.Router();
import Product from "../models/product.js";

// list + search + filter
router.get('/', async (req,res) => {
  const { search, category, skip=0, limit=20 } = req.query;
  const q = {};
  if (search) q.$or = [
    { title: new RegExp(search, 'i') },
    { description: new RegExp(search, 'i') }
  ];
  if (category) q.category = category;

  const [items, total] = await Promise.all([
    Product.find(q).sort({createdAt:-1}).skip(parseInt(skip)).limit(parseInt(limit)),
    Product.countDocuments(q)
  ]);
  res.json({ total, items });
});

// get by id
router.get('/:id', async (req,res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

// create (protected - plug your auth middleware)
router.post('/', async (req,res) => {
  // TODO: check req.user or a seller token
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

export default router;

