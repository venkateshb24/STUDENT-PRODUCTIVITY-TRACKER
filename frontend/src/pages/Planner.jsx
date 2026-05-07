import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import api from "../api/axios";
import toast from "react-hot-toast";
import "./Planner.css";

function Planner() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoalText, setNewGoalText] = useState("");

  const monthName = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  // Load goals when page opens
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const res = await api.get("/planner");
        setGoals(res.data.goals);
      } catch {
        toast.error("Failed to load goals");
      } finally {
        setLoading(false);
      }
    };
    loadGoals();
  }, []);

  // Add a new goal
  const handleAdd = async () => {
    if (!newGoalText.trim()) {
      toast.error("Please enter a goal");
      return;
    }

    try {
      const res = await api.post("/planner", { text: newGoalText });
      setGoals([...goals, res.data.goal]);
      setNewGoalText("");
      toast.success("Goal added");
    } catch {
      toast.error("Failed to add goal");
    }
  };

  // Toggle goal as done or not done
  const handleToggle = async (goalId) => {
    // Update in UI first
    const previousGoals = goals;
    setGoals(
      previousGoals.map((g) =>
        g._id === goalId ? { ...g, completed: !g.completed } : g
      )
    );

    // Save to backend
    try {
      await api.patch(`/planner/${goalId}`);
    } catch {
      setGoals(previousGoals);
      toast.error("Failed to update goal");
    }
  };

  // Delete a goal
  const handleDelete = async (goalId) => {
    const previousGoals = goals;
    setGoals(goals.filter((g) => g._id !== goalId));

    try {
      await api.delete(`/planner/${goalId}`);
      toast.success("Goal deleted");
    } catch {
      setGoals(previousGoals);
      toast.error("Failed to delete goal");
    }
  };

  // Count done goals
  const total = goals.length;
  const done = goals.filter((g) => g.completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  if (loading) return <Sidebar><Spinner /></Sidebar>;

  return (
    <Sidebar>
      <div className="page-header">
        <h1 className="page-title">Monthly Planner</h1>
        <p className="page-sub">{monthName} {year} — set your goals, check them off</p>
      </div>

      {/* Progress bar */}
      <div className="planner-progress-card">
        <div>
          <p className="pp-label">This Month</p>
          <p>
            <span className="pp-done">{done}</span>
            <span className="pp-total"> / {total} completed</span>
          </p>
        </div>
        <div className="pp-right">
          <div className="pp-bar-track">
            <div className="pp-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="pp-pct">{percent}% done</p>
        </div>
      </div>

      {/* Add goal input */}
      <div className="add-goal-row">
        <input
          type="text"
          className="add-goal-input"
          placeholder="Add a goal... e.g. Solve 50 DSA problems"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
        />
        <button className="add-goal-btn" onClick={handleAdd}>
          + Add
        </button>
      </div>

      {/* Goals list */}
      <div className="goals-list">
        {goals.length === 0 && (
          <div className="goals-empty">
            <p>No goals yet for {monthName}. Add your first goal above ↑</p>
          </div>
        )}

        {goals.map((goal) => (
          <div
            key={goal._id}
            className={`goal-row ${goal.completed ? "goal-row--done" : ""}`}
          >
            {/* Checkbox to mark done */}
            <input
              type="checkbox"
              className="goal-check"
              checked={goal.completed}
              onChange={() => handleToggle(goal._id)}
            />

            {/* Goal text — strikethrough when done */}
            <span
              className="goal-text"
              style={{
                textDecoration: goal.completed ? "line-through" : "none",
                opacity: goal.completed ? 0.5 : 1,
              }}
            >
              {goal.text}
            </span>

            {/* Done badge */}
            {goal.completed && (
              <span className="goal-done-badge">✓ Done</span>
            )}

            {/* Delete button */}
            <button
              className="goal-delete-btn"
              onClick={() => handleDelete(goal._id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </Sidebar>
  );
}

export default Planner;
