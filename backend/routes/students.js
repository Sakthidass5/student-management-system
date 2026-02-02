const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const audit = require("../middleware/audit");
const router = express.Router();

// Add Student (Admin only)
router.post("/", auth, audit, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Get Students with pagination + filter
router.get("/", auth, async (req, res) => {
  const { page = 1, limit = 10, name, className } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (className) query.class = className;

  const students = await Student.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Student.countDocuments(query);

  res.json({ students, count });
});

router.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  console.log(student,'studentstudent')
  res.json(student);
});


module.exports = router;
