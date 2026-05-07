const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getLeaderboard } = require("../controllers/LeaderboardController");

// GET /leaderboard → returns top 10 + current user rank
router.get("/", authMiddleware, getLeaderboard);

module.exports = router;