const express = require("express");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const router = express.Router();
const studentController = require("../controllers/studentController");
const multer = require("multer");
const upload = require("../middlewares/uploadMiddleware")
const { addStudent, updateStudent, deleteStudent, getStudents, getStudentById } = require("../controllers/studentController");
const auditLogger = require("../middlewares/AuditMiddleware");


router.get("/export", studentController.exportStudents);
router.post("/import", upload.single("file"), studentController.importStudents);

// CRUD routes

router.get("/", auth, getStudents);
router.get("/:id", auth, getStudentById);
// studentRoutes.js
router.post("/", auth, role("Admin"), upload.single("photo"), auditLogger("ADD"), addStudent);

router.put("/:id", auth, role("Admin"), auditLogger("EDIT"), updateStudent);
router.delete("/:id", auth, role("Admin"), auditLogger("DELETE"), deleteStudent);
router.get("/classes", studentController.getClasses);
module.exports = router;


