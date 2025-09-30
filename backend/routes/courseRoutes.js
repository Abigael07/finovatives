// backend/routes/courseRoutes.js
import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// ✅ Get course by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get courses by instructor ID
router.get("/instructor/:id", async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get course by MongoDB ObjectId
router.get("/id/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
