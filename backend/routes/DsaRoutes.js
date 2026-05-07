const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProgress, toggleProblem, saveNote } = require("../controllers/DsaController");

// GET  /dsa/progress  → get user's completed problems + notes
router.get("/progress", authMiddleware, getProgress);

// POST /dsa/toggle    → mark a problem done or undone
router.post("/toggle", authMiddleware, toggleProblem);

// POST /dsa/note      → save a note for a problem
router.post("/note", authMiddleware, saveNote);

module.exports = router;