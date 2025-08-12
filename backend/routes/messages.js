const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ destructure the middleware
const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
router.post('/', verifyToken, async (req, res) => {
  const { content } = req.body;
  try {
    const instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });

    const message = new Message({
      sender: req.user._id,
      receiver: instructor._id,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// View inbox messages
router.get('/inbox', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .sort({ timestamp: -1 })
      .populate('sender receiver', 'name');

    const conversationMap = new Map();

    for (const msg of messages) {
      const otherUser = msg.sender._id.toString() === userId.toString()
        ? msg.receiver
        : msg.sender;

      if (!conversationMap.has(otherUser._id.toString())) {
        conversationMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg.content,
          timestamp: msg.timestamp
        });
      }
    }

    const conversations = Array.from(conversationMap.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json(conversations);
  } catch (err) {
    console.error("Inbox fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

// GET messages between current user and another user
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
