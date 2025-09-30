const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const { verifyToken, verifyInstructor } = require("../middleware/authMiddleware");
const { uploadCourse, getCourses, getCourseById } = require("../controllers/courseController");
const Course = require("../models/Course");
const authMiddleware = require("../middleware/auth");

// ------------------ MULTER STORAGE ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ------------------ ROUTES ------------------

// Upload course (instructors only)
router.post("/", verifyToken, verifyInstructor, upload.single("file"), uploadCourse);

// Get all courses (students + instructors)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    console.error("All courses fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// routes/course.js
router.post("/upload", authMiddleware, async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      fileUrl: req.body.fileUrl,
      price: req.body.price,
      depositPrice: req.body.depositPrice,
      instructorId: req.user.id,        // from JWT
      instructorName: req.user.name,    // store name directly for quick access
    });

    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload course" });
  }
});


// Get courses uploaded by logged-in instructor
router.get("/instructor", auth, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ error: "Access denied" });
    }
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (err) {
    console.error("Instructor fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get course by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Get course by slug error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// routes/courses.js
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email'); 
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});


// Get single course by ID
router.get("/:id", getCourseById);

module.exports = router;
