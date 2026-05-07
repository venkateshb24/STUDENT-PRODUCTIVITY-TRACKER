import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import api from "../api/axios";
import toast from "react-hot-toast";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data when page loads
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard");
        setLeaderboard(res.data.leaderboard);
        setCurrentUser(res.data.currentUser);
      } catch {
        toast.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <Sidebar><Spinner /></Sidebar>;

  return (
    <Sidebar>
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-sub">Top students ranked by streak and problems solved</p>
      </div>

      {/* Current user's rank summary */}
      {currentUser && (
        <div className="your-rank-card">
          <div className="yr-left">
            <p className="yr-label">Your Rank</p>
            <p className="yr-rank">#{currentUser.rank}</p>
          </div>
          <div className="yr-divider" />
          <div className="yr-stat">
            <p className="yr-stat-label">Streak</p>
            <p className="yr-stat-val">🔥 {currentUser.streak}</p>
          </div>
          <div className="yr-divider" />
          <div className="yr-stat">
            <p className="yr-stat-label">Problems</p>
            <p className="yr-stat-val">{currentUser.totalProblems}</p>
          </div>
          <div className="yr-divider" />
          <div className="yr-stat">
            <p className="yr-stat-label">Out of</p>
            <p className="yr-stat-val">{currentUser.totalUsers} students</p>
          </div>
        </div>
      )}

      {/* Leaderboard table */}
      <div className="lb-table">

        {/* Table header */}
        <div className="lb-header-row">
          <span>Rank</span>
          <span>Student</span>
          <span>Streak</span>
          <span>Problems</span>
          <span>Study Hours</span>
          <span>Planner</span>
          <span>Quiz Best</span>
        </div>

        {/* Table rows */}
        {leaderboard.map((entry) => (
          <div
            key={entry.username}
            className={`lb-row ${entry.isCurrentUser ? "lb-row--you" : ""}`}
          >
            <span className="lb-rank">#{entry.rank}</span>
            <span className="lb-name">
              {entry.username}
              {entry.isCurrentUser && <span className="you-tag">You</span>}
            </span>
            <span className="lb-streak">🔥 {entry.streak} days</span>
            <span className="lb-problems">{entry.totalProblems}</span>
            <span className="lb-hours">{entry.totalStudyHours}h</span>
            <span className="lb-planner">{entry.plannerCompletedGoals}/{entry.plannerTotalGoals}</span>
            <span className="lb-quiz">{entry.quizBestPercent}%</span>
          </div>
        ))}

        {leaderboard.length === 0 && (
          <div className="lb-empty">No data yet. Start logging to appear here!</div>
        )}
      </div>

    </Sidebar>
  );
}

export default Leaderboard;
