// controllers/serviceController.js
const Service = require("../models/Service");

// Add a service (for provider)
const addService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = new Service({
      name,
      description,
      price,
      provider: req.user._id,
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all services (for clients/students)
const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "name email"
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.provider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    const { name, description, price } = req.body;
    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.provider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await service.remove();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
