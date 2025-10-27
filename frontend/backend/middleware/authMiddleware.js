// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and attach user to req
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};

// Middleware to check if user is an instructor
const verifyInstructor = (req, res, next) => {
  if (req.user && req.user.role === "instructor") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Instructors only." });
};

module.exports = { verifyToken, verifyInstructor };
