const Student = require("../models/Student");

exports.getAll = async (query) => {
  const { page = 1, limit = 10, name, className } = query;
  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (className) filter.className = className;

  return Student.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
};

exports.getById = async (id) => Student.findById(id);

exports.create = async (data, file) => {
  if (file) data.photo = `/uploads/${file.filename}`;
  return Student.create(data);
};

exports.update = async (id, data, file) => {
  if (file) data.photo = `/uploads/${file.filename}`;
  return Student.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => Student.findByIdAndDelete(id);



