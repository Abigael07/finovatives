const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true }, // direct file path
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    instructorName: { type: String, required: true }, // store name directly
    price: { type: Number, required: true }, 
    depositPrice: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
