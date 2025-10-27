// backend/seed/seed.js
const mongoose = require('mongoose');
const Seller = require('../models/Seller');
const Product = require('../models/Product');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/finovative';
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true });

async function seed() {
  await Seller.deleteMany({});
  await Product.deleteMany({});

  const s1 = await Seller.create({ name:'Mkulima Farm', phone:'0700000000', location:'Nairobi', description:'Smallholder farm' });
  const s2 = await Seller.create({ name:'Green Valley', phone:'0711111111', location:'Kiambu', description:'Market vendor' });

  await Product.create([
    { title:'Tomatoes (crate)', description:'Fresh red tomatoes', price:2000, unit:'crate', category:'vegetables', location:'Nairobi', sellerId:s1._id, image:'/images/tomatoes.jpg' },
    { title:'Irish Potatoes (kg)', description:'Clean washed potatoes', price:80, unit:'kg', category:'grains', location:'Kiambu', sellerId:s2._id, image:'/images/potatoes.jpg' },
    // add more...
  ]);

  console.log('seeded');
  process.exit(0);
}

seed();
