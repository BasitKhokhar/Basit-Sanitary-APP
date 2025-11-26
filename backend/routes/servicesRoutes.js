const express = require('express');
const router = express.Router();
const {verifyToken, }= require('../middleware/authMiddleware');

const {
  getServices,
  getPlumbers,
} = require("../controllers/servicesController");

// 📌 Get all services
router.get("/getservices",verifyToken, getServices);

// 📌 Get all plumbers
router.get("/getplumbers",verifyToken, getPlumbers);

module.exports = router;
