// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes (must include .js extensions for ESM)
import products from './routes/products.js';
import sellers from './routes/sellers.js';
import messages from './routes/messages.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);  // ✅ separate endpoint for contact

// API routes
app.use('/api/products', products);
app.use('/api/sellers', sellers);
app.use('/api/messages', messages);

app.use('/api/auth', authRoutes);
app.use("/api/services", serviceRoutes);

// MongoDB connection
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/finovative';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Mongo connected'))
  .catch((err) => console.error('❌ Mongo connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
