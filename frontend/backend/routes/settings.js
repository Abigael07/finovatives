const express = require('express');
const router = express.Router();
const User = require('../models/User');
const{verifyToken}  = require('../middleware/authMiddleware'); // ✅ FIXED this line
const ContactForm = require('../models/ContactForm');
const auth = require('../middleware/auth'); // ✅ Add this


// PUT /api/settings
router.put('/', verifyToken, async (req, res) => { // ✅ changed authenticateToken → verifyToken
  try {
    const { emailNotifications, theme } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (theme) user.theme = theme;

    await user.save();

    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/contact-messages', auth, async (req, res) => {
  try {
    const messages = await ContactForm.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
