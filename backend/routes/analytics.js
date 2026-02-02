const express = require("express");
const Student = require("../models/Student");
const AuditLog = require("../models/AuditLog");
const router = express.Router();
const {getDashboard } = require("../controllers/dashboardController");


router.get("/audit-logs", async (req, res) => {
  const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(50);
  res.json(logs);
});


router.get("/dashboard", getDashboard);

module.exports = router;
