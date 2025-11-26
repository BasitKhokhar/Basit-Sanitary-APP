const prisma = require("../prisma/client");

// =========================
// 📌 Get All Services
// =========================
exports.getServices = async (req, res) => {
  try {
    const services = await prisma.services.findMany(); // model name matches schema
    res.status(200).json(services);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// =========================
// 📌 Get All Plumbers
// =========================
exports.getPlumbers = async (req, res) => {
  try {
    const plumbers = await prisma.plumbers.findMany(); // model name matches schema
    res.status(200).json(plumbers);
  } catch (error) {
    console.error("❌ Error fetching plumbers:", error);
    res.status(500).json({ error: "Failed to fetch plumbers" });
  }
};

// =========================
// 📌 Get Plumber By ID (optional)
// =========================
exports.getPlumberById = async (req, res) => {
  try {
    const { id } = req.params;

    const plumber = await prisma.plumbers.findUnique({
      where: { id: Number(id) },
    });

    if (!plumber) {
      return res.status(404).json({ error: "Plumber not found" });
    }

    res.status(200).json(plumber);
  } catch (error) {
    console.error("❌ Error fetching plumber:", error);
    res.status(500).json({ error: "Failed to fetch plumber" });
  }
};
