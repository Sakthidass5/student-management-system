const AuditLog = require("../models/AuditLog");

module.exports = async (req, res, next) => {
  res.on("finish", async () => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      await AuditLog.create({
        user: req.user?.id || "Unknown",
        action: `${req.method} ${req.originalUrl}`,
        changes: req.body
      });
    }
  });
  next();
};
