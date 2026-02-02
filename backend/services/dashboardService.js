const Student = require("../models/Student");

exports.getAnalytics = async () => {
  const total = await Student.countDocuments();
  const perClass = await Student.aggregate([{ $group: { _id: "$className", count: { $sum: 1 } } }]);
  const genderRatio = await Student.aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }]);
  return { total, perClass, genderRatio };
};
