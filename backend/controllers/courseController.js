const Course = require("../models/Course");

exports.uploadCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const newCourse = new Course({
      title,
      description,
      fileUrl,
      instructorId: req.user.id,      // store instructor ID
      instructorName: req.user.name   // store instructor name
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course uploaded successfully",
      course: newCourse
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
