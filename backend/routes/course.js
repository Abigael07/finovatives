const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verifyToken, verifyInstructor } = require("../middleware/authMiddleware");
const { uploadCourse, getCourses, getCourseById } = require("../controllers/courseController");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload course
router.post("/", verifyToken, verifyInstructor, upload.single("file"), uploadCourse);

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", getCourseById);

module.exports = router;
