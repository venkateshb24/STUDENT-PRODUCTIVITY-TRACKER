const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { saveAttempt } = require("../controllers/QuizController");

router.post("/attempt", authMiddleware, saveAttempt);

module.exports = router;
