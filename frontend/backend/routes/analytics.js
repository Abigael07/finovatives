const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');



router.get('/instructor', auth, async (req, res) => {
  try {
    const instructorId = req.user._id;

    const enrollments = await Enrollment.aggregate([
      { $match: { instructor: instructorId } },
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: '$course'
      },
      {
        $project: {
          title: '$course.title',
          count: 1
        }
      }
    ]);

    const uploads = await Course.aggregate([
      { $match: { instructor: instructorId } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ]);

    const uploadsByMonth = {};
    uploads.forEach(u => {
      const month = new Date(0, u._id - 1).toLocaleString('default', { month: 'long' });
      uploadsByMonth[month] = u.count;
    });

    res.json({ enrollments, uploads: uploadsByMonth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
