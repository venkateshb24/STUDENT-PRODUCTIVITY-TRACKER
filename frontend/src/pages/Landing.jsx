import { Link } from "react-router-dom";
import "./Landing.css";

// ── LOGO SVG ────────────────────────────────────────────
// Reusable so we use it in both navbar and footer
function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="9" fill="#22c55e"/>
      <polyline
        points="6,26 13,18 20,22 30,10"
        stroke="#0d1117" strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      <circle cx="30" cy="10" r="2.5" fill="#0d1117"/>
    </svg>
  );
}

// ── STREAK CALENDAR ──────────────────────────────────────
// On landing page this is just a demo with fake logged days
// The real one in Dashboard will use actual API data
function CalendarPreview() {
  // fake data just for the landing page visual
  const loggedDays = [1,2,4,5,6,8,9,10,11,13,14,15,17,18,19,20,21,22];
  const today = new Date().getDate();

  // Feb 2026 starts on Sunday → getDay() = 0, so no empty boxes needed
  // But we calculate it properly so this works for any month
  const firstDayOfWeek = new Date(2026, 1, 1).getDay();
  const daysInMonth = 28; // Feb 2026

  // Build array of empty slots for days before the 1st
  // e.g. if month starts on Wednesday, we need 3 empty boxes first
  const emptySlots = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // Build array of all days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="cal-box">
      <div className="cal-month">February 2026</div>
      <div className="cal-grid">
        {/* Empty slots before day 1 */}
        {emptySlots.map((i) => (
          <div key={`empty-${i}`} className="cd" />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const isLogged = loggedDays.includes(day);
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`cd ${isLogged ? "cd--on" : "cd--off"} ${isToday ? "cd--today" : ""}`}
            >
              {/* 🔥 if logged, · if not */}
              {isLogged ? "🔥" : "·"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── FEATURES DATA ────────────────────────────────────────
// Array makes it easy to add/remove features later
// Just add an object here and it renders automatically
const features = [
  {
    icon: "💻",
    name: "DSA Tracker",
    desc: "Problems by pattern. Mark done, add notes, see progress per topic.",
  },
  {
    icon: "🔥",
    name: "Streak Calendar",
    desc: "Every logged day lights up. Every gap reminds you to show up.",
  },
  {
    icon: "📊",
    name: "Readiness Score",
    desc: "A live score out of 100 based on streak, problems, and consistency.",
  },
  {
    icon: "📚",
    name: "Core Subject Quiz",
    desc: "Quick quizzes on OS, DBMS, CN and OOP to test theory knowledge.",
  },
  {
    icon: "📅",
    name: "Monthly Planner",
    desc: "Set monthly goals, check them off. Keeps your plan visible.",
  },
  {
    icon: "🏆",
    name: "Leaderboard",
    desc: "Rank among peers by consistency. Are you in the top 10%?",
  },
];

// ── MAIN COMPONENT ───────────────────────────────────────
function Landing() {
  return (
    <div className="landing">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-logo">
          <Logo size={30} />
          <span className="logo-name">
            Pace<span className="logo-accent">Up</span>
          </span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="btn-ghost">Login</Link>
          <Link to="/register" className="btn-green">Get Started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="badge">🎯 For placement-driven students</div>

        <h1 className="hero-title">
          Stop drifting.<br />
          Start <em>building streaks.</em>
        </h1>

        <p className="hero-sub">
          Track DSA problems, log daily progress, and see your
          placement readiness score — all in one place.
        </p>

        <div className="hero-btns">
          <Link to="/register" className="btn-big">Start Free →</Link>
          <a href="#features" className="btn-big-outline">See Features</a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        {features.map((f) => (
          <div key={f.name} className="feat-card">
            <div className="feat-icon">{f.icon}</div>
            <div className="feat-name">{f.name}</div>
            <div className="feat-desc">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* ── CALENDAR PREVIEW ── */}
      <section className="cal-section">
        <div className="cal-text">
          <h2>Your month,<br />at a glance</h2>
          <p>
            Every logged day lights up as 🔥.<br />
            Every gap is an honest reminder.<br />
            Simple. No hiding from it.
          </p>
        </div>
        <CalendarPreview />
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <h2>Ready to PaceUp?</h2>
        <p>Free to use. No excuses.</p>
        <Link to="/register" className="btn-big">Create Your Account →</Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="nav-logo">
          <Logo size={22} />
          <span className="logo-name" style={{ fontSize: "0.85rem" }}>
            Pace<span className="logo-accent">Up</span>
          </span>
        </div>
        <span className="footer-copy">Built by Venkatesh · 2026</span>
      </footer>

    </div>
  );
}

export default Landing;