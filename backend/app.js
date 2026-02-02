const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middlewares/errorHandler");
const analyticsRoutes = require("./routes/analytics");


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/analytics", analyticsRoutes);

app.use(errorHandler);

module.exports = app;
