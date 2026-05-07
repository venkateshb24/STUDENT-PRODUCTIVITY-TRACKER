import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import StreakCalendar from "../components/StreakCalendar";
import api from "../api/axios";
import toast from "react-hot-toast";
import "./Dashboard.css";

// ── READINESS CARD ────────────────────────────────────────
function ReadinessCard({ score, streak, totalProblems, daysLogged, plannerPercent, quizBestPercent }) {
  const getStatus = (s) => {
    if (s >= 80) return "Placement Ready 🚀";
    if (s >= 50) return "On Track 💪";
    if (s >= 25) return "Getting There 🌱";
    return "Just Starting 👋";
  };

  const circleStyle = {
    background: `conic-gradient(#f97316 0% ${score}%, rgba(255,255,255,0.08) ${score}% 100%)`
  };

  return (
    <div className="readiness-card">
      <div className="score-circle" style={circleStyle}>
        <span className="score-num">{score}</span>
      </div>
      <div className="readiness-info">
        <p className="readiness-label">Placement Readiness Score</p>
        <p className="readiness-status-title">{getStatus(score)}</p>
        <p className="readiness-status">
          {score >= 100 ? "Max score achieved!" : `${100 - score} points from ready`}
        </p>
      </div>
      <div className="readiness-breakdown">
        <div className="breakdown-item">
          <div className="breakdown-val" style={{ color: "#f97316" }}>{totalProblems}</div>
          <div className="breakdown-key">Problems</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-val" style={{ color: "#22d3ee" }}>{streak}</div>
          <div className="breakdown-key">Day Streak</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-val" style={{ color: "#4ade80" }}>{daysLogged}</div>
          <div className="breakdown-key">Days Logged</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-val" style={{ color: "#facc15" }}>{plannerPercent}%</div>
          <div className="breakdown-key">Planner</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-val" style={{ color: "#c084fc" }}>{quizBestPercent}%</div>
          <div className="breakdown-key">Quiz Best</div>
        </div>
      </div>
    </div>
  );
}

// ── TODAY'S LOG FORM ──────────────────────────────────────
// small inline form to log today's activity directly from dashboard
function TodayLog({ onSaved }) {
  const [problems, setProblems] = useState("");
  const [hours, setHours] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!problems && !hours) {
      toast.error("Enter at least one value");
      return;
    }
    setSaving(true);
    try {
      await api.post("/productivity/today", {
        dsaCount: problems || 0,
        studyHours: hours || 0,
      });
      toast.success("Today's log saved!");
      setProblems("");
      setHours("");
      if (onSaved) onSaved(); // refresh dashboard data
    } catch {
      toast.error("Failed to save log");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="today-log">
      <p className="tl-title">Log Today</p>
      <div className="tl-row">
        <div className="tl-field">
          <label className="tl-label">Problems solved</label>
          <input
            type="number"
            className="tl-input"
            placeholder="0"
            min="0"
            value={problems}
            onChange={e => setProblems(e.target.value)}
          />
        </div>
        <div className="tl-field">
          <label className="tl-label">Study hours</label>
          <input
            type="number"
            className="tl-input"
            placeholder="0"
            min="0"
            step="0.5"
            value={hours}
            onChange={e => setHours(e.target.value)}
          />
        </div>
        <button
          className="tl-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save →"}
        </button>
      </div>
    </div>
  );
}

// ── CORE SUBJECTS ─────────────────────────────────────────
const coreSubjects = [
  { id: "os",   label: "Operating Systems", icon: "🖥️", topics: 12 },
  { id: "dbms", label: "DBMS",              icon: "🗄️", topics: 10 },
  { id: "cn",   label: "Computer Networks", icon: "🌐", topics: 9  },
  { id: "oop",  label: "OOP Concepts",      icon: "🧱", topics: 8  },
];

// ── MAIN DASHBOARD ────────────────────────────────────────
function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/productivity/dashboard");
      setData(res.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // called after today's log is saved — refreshes all dashboard data
  const handleLogSaved = async () => {
    try {
      const res = await api.get("/productivity/dashboard");
      setData(res.data);
    } catch {
      toast.error("Saved, but dashboard refresh failed");
    }
  };

  if (loading) return <Sidebar><Spinner /></Sidebar>;

  const { user, readinessScore, thisMonthLoggedDays, plannerStats, quizStats } = data;

  return (
    <Sidebar>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Welcome back, {user.username} 👋</p>
      </div>

      {/* ── READINESS BANNER ── */}
      <ReadinessCard
        score={readinessScore}
        streak={user.streak}
        totalProblems={user.totalProblems}
        daysLogged={thisMonthLoggedDays.length}
        plannerPercent={plannerStats.percent}
        quizBestPercent={quizStats.bestPercent}
      />

      {/* ── STATS ROW ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Current Streak</div>
          <div className="stat-val" style={{ color: "#f97316" }}>
            {user.streak}<span className="stat-unit"> days</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Problems</div>
          <div className="stat-val" style={{ color: "#22d3ee" }}>{user.totalProblems}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Study Hours</div>
          <div className="stat-val" style={{ color: "#4ade80" }}>
            {user.totalStudyHours}<span className="stat-unit">h</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Planner Goals</div>
          <div className="stat-val" style={{ color: "#facc15" }}>
            {plannerStats.completedGoals}<span className="stat-unit">/{plannerStats.totalGoals}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Quiz Best</div>
          <div className="stat-val" style={{ color: "#c084fc" }}>
            {quizStats.bestPercent}<span className="stat-unit">%</span>
          </div>
        </div>
      </div>

      {/* ── TWO COLUMN: Calendar + Today Log ── */}
      <div className="cal-log-row">
        {/* GitHub-style calendar — no more fire emojis */}
        <StreakCalendar loggedDays={thisMonthLoggedDays} />

        {/* today's log form — unique feature */}
        <TodayLog onSaved={handleLogSaved} />
      </div>

      {/* ── BOTTOM GRID: DSA + Subjects ── */}
      <div className="bottom-row">
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">💻 DSA Progress</span>
          </div>
          <p className="section-card-desc" style={{ marginBottom: "14px" }}>
            Track problems by pattern — see progress per topic.
          </p>
          <button className="go-btn" onClick={() => navigate("/dsa")}>
            Go to DSA Tracker →
          </button>
        </div>

        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">📚 Core Subjects</span>
          </div>
          {coreSubjects.map((s) => (
            <div
              key={s.id}
              className="subject-row"
              onClick={() => navigate(`/quiz?subject=${s.id}`)}
            >
              <span className="subject-icon">{s.icon}</span>
              <div className="subject-info">
                <div className="subject-name">{s.label}</div>
                <div className="subject-topics">{s.topics} topics · 10 questions</div>
              </div>
              <button className="quiz-btn">Start Quiz</button>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
