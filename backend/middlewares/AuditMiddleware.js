
const AuditLog = require("../models/AuditLog");
const auditLogger = (actionType) => {
  return async (req, res, next) => {
    try {
      console.log(req,'req')
      await AuditLog.create({
        user: req.user.id,
        actionType,
        timestamp: new Date(),
        dataChanges: req.body
      });
    } catch (err) {
      console.error("Audit log error:", err);
    }
    next();
  };
};

module.exports = auditLogger;
