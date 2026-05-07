const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getGoals, addGoal, toggleGoal, deleteGoal } = require("../controllers/PlannerController");

// GET    /planner        → get this month's goals
router.get("/", authMiddleware, getGoals);

// POST   /planner        → add a new goal
router.post("/", authMiddleware, addGoal);

// PATCH  /planner/:id    → toggle completed true/false
router.patch("/:id", authMiddleware, toggleGoal);

// DELETE /planner/:id    → delete a goal
router.delete("/:id", authMiddleware, deleteGoal);

module.exports = router;