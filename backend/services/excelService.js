const XLSX = require("xlsx");

exports.exportStudents = (students) => {
  const ws = XLSX.utils.json_to_sheet(students);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
};
