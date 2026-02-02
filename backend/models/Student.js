const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  className: { type: String, match: /^[0-9]+[A-Z]$/ },
  email: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  photo: { type: String },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
