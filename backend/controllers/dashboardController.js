const Student = require("../models/Student");

const getDashboard = async (req, res) => {
  try {
    const total = await Student.countDocuments();

    const perClass = await Student.aggregate([
      { $group: { _id: "$className", count: { $sum: 1 } } }
    ]);

    const genderRatioAgg = await Student.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]);

    const genderRatio = genderRatioAgg.reduce((acc, g) => {
      acc[g._id] = g.count;
      return acc;
    }, {});

    res.json({ total, perClass, genderRatio });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard", error: err.message });
  }
};

module.exports = { getDashboard };
