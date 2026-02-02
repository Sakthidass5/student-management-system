const express = require("express");
const Student = require("../models/Student");
const XLSX = require("xlsx");
const router = express.Router();

// Export students to Excel
router.get("/export", async (req, res) => {
  const students = await Student.find();
  const worksheet = XLSX.utils.json_to_sheet(students.map(s => s.toObject()));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");
  res.send(buffer);
});

// Import students from Excel
router.post("/import", async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);
  await Student.insertMany(data, { ordered: false });
  res.json({ message: "Students imported" });
});

module.exports = router;
