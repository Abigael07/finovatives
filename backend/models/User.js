const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },

  password: {
    type: String,
    required: true
  },

  profilePic: {
    type: String,
    default: ''
  },

  // ✅ Store settings inside one object
  settings: {
    emailNotifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  },

  // Unified array for flexibility
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],

  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],

  UploadedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
