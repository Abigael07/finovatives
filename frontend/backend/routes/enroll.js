// routes/enroll.js
const express = require("express");
const router = express.Router();
//const verifyToken = require("../middleware/authMiddleware"); // ✅ FIXED import
const { verifyToken } = require("../middleware/authMiddleware");

const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// @route   POST /api/enroll
// @desc    Enroll a student in a course
// @access  Private
router.post("/", verifyToken, async (req, res) => {
  try {
    const { courseId, timeSlot } = req.body;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // Save new enrollment
    const enrollment = new Enrollment({
      userId: req.user.id,
      courseId,
      timeSlot,
    });

    await enrollment.save();

    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    console.error("Error enrolling:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/enroll/my
// @desc    Get courses the logged-in user is enrolled in
// @access  Private
router.get("/my", verifyToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate(
      "courseId",
      "title description"
    );

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
