const Student = require("../models/Student");
const AuditLog = require("../models/AuditLog");
const path = require('path');
const ExcelJS = require("exceljs");

const StudentService = require('../services/studentService')

exports.getStudents = async (req, res) => {
  try {
    const students = await StudentService.getAll(req.query);
    res.json(students);
  } catch (err) { res.status(500).json({ message: "Error fetching students", error: err.message }); }
};


exports.getStudentById = async (req, res) => {
  try {
    const student = await StudentService.getById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" }); res.json(student);
  }
  catch (err) { res.status(500).json({ message: "Error fetching student", error: err.message }); }
};

exports.addStudent = async (req, res) => {
  console.log("Body:", req.body); console.log("File:", req.file);
  try {
    const student = await StudentService.create(req.body, req.file);
    res.status(201).json(student);
  }
  catch (err) { res.status(400).json({ message: "Error adding student", error: err.message }); }
};


exports.updateStudent = async (req, res) => {
  try {
    const student = await StudentService.update(req.params.id, req.body, req.file); res.json(student);
  }
  catch (err) { res.status(400).json({ message: "Error updating student", error: err.message }); }
};

exports.deleteStudent = async (req, res) => { try { await StudentService.remove(req.params.id); res.json({ message: "Student deleted successfully" }); } catch (err) { res.status(400).json({ message: "Error deleting student", error: err.message }); } };

exports.importStudents = async (req, res) => {
  try {
    const filePath = path.resolve(req.file.path);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      return res.status(400).json({ error: "No worksheet found in Excel file" });
    }

    const students = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const [name, className, gender, emailCell] = row.values.slice(1);

      let email = emailCell;
      if (typeof emailCell === 'object' && emailCell.text) {
        email = emailCell.text;
      }

      students.push({ name, className, gender, email });
    });

    let successCount = 0;
    let failedCount = 0;

    for (let s of students) {
      try {
        const exists = await Student.findOne({ email: s.email });
        if (!exists) {
          await Student.create(s);
          successCount++;
        }
      } catch (err) {
        failedCount++;
        console.error("Validation failed for student:", s, err.message);
      }
    }
    res.json({
      message: "Import completed successfully",
      added: successCount,
      skipped: failedCount
    });
  } catch (err) {
    console.error("Import error:", err);
    res.status(500).json({ error: "Import failed" });
  }
};


exports.exportStudents = async (req, res) => {
  try {
    const students = await Student.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Class', key: 'className', width: 10 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Email', key: 'email', width: 30 },
    ];
    students.forEach(s => worksheet.addRow(s));
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=studentsList.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: "Export failed" });
  }
};



exports.getClasses = async (req, res) => {
  try {
    const classes = await Student.distinct("className");
    res.json(classes);
  } catch (err) {
    console.log(err,'err')
    res.status(500).json({err, message: "Error fetching classes" });
  }
};