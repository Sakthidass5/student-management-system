

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    actionType: { type: String, enum: ["ADD", "EDIT", "DELETE"], required: true },
    timestamp: { type: Date, default: Date.now },
    dataChanges: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
