require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollRoutes = require('./routes/enroll');
const profileRoutes = require('./routes/profile');
const messageRoutes = require('./routes/messages');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;
const analyticsRoutes = require('./routes/analytics');


// ✅ CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Serve uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use(express.urlencoded({ extended: true })); 


// ✅ Root route
app.get('/', (req, res) => {
  res.send('FINOVATIVE INSIGHTS Backend Running');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
});
