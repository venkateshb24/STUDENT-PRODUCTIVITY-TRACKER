const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveTodayLog,
  getAllLogs,
  getDashboardSummary,
} = require("../controllers/productivityController");

// POST /productivity/today — save or update today's log
router.post("/today", authMiddleware, saveTodayLog);

// GET /productivity — get all logs for this user
router.get("/", authMiddleware, getAllLogs);

// GET /productivity/dashboard — get everything dashboard needs in one call
router.get("/dashboard", authMiddleware, getDashboardSummary);

module.exports = router;