// backend/routes/enrollment.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Course = require('../models/Course');
const User = require('../models/User');

router.post('/enroll/:courseId', verifyToken, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.json({ msg: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});
router.get('/myschedule', authMiddleware, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ userId: req.user._id });
    if (!enrollment) {
      return res.status(404).json({ message: 'No schedule found' });
    }
    res.json({ timeSlot: enrollment.timeSlot });
  } catch (err) {
    console.error('Error fetching schedule:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
