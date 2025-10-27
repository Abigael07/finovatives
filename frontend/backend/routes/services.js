// routes/services.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Create a service (for provider)
router.post("/", verifyToken, addService);

// Get all services (for clients/students)
router.get("/", getServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.put("/:id", verifyToken, updateService);

// Delete service
router.delete("/:id", verifyToken, deleteService);

module.exports = router;
