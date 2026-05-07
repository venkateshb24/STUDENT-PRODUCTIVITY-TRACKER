import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  CalendarCheck,
  Trophy,
  BrainCircuit,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { logout } from "../utils/auth";
import "./Sidebar.css";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/dsa", label: "DSA Tracker", Icon: Code2 },
  { to: "/planner", label: "Planner", Icon: CalendarCheck },
  { to: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { to: "/quiz", label: "Quiz", Icon: BrainCircuit },
];

function ProfilePopup({ username, onLogout, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="profile-popup" ref={popupRef}>
      <div className="popup-user">
        <div className="popup-avatar">
          {username ? username[0].toUpperCase() : "U"}
        </div>
        <div className="popup-user-info">
          <p className="popup-username">{username}</p>
          <p className="popup-role">Student</p>
        </div>
      </div>

      <div className="popup-divider" />

      <button className="popup-logout" onClick={onLogout}>
        <LogOut size={14} />
        <span>Logout</span>
      </button>
    </div>
  );
}

function Sidebar({ children }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const getUsername = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "User";
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.username || "User";
    } catch {
      return "User";
    }
  };

  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="9" fill="#f97316" />
            <polyline
              points="6,26 13,18 20,22 30,10"
              stroke="#0d1117"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="30" cy="10" r="2.5" fill="#0d1117" />
          </svg>
          <span className="logo-text">Pace<span className="logo-accent">Up</span></span>
        </div>

        <nav className="sidebar-nav">
          {navLinks.map((link) => {
            const NavIcon = link.Icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-item nav-item--active" : "nav-item"
                }
              >
                <NavIcon size={17} strokeWidth={1.8} className="nav-icon" />
                <span className="nav-label">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="profile-section">
          {showPopup && (
            <ProfilePopup
              username={username}
              onLogout={handleLogout}
              onClose={() => setShowPopup(false)}
            />
          )}

          <button
            className={`profile-btn ${showPopup ? "profile-btn--active" : ""}`}
            onClick={() => setShowPopup((prev) => !prev)}
          >
            <div className="profile-avatar">
              {username[0].toUpperCase()}
            </div>
            <span className="profile-name">{username}</span>
            <ChevronUp
              size={14}
              className={`profile-chevron ${showPopup ? "profile-chevron--up" : "profile-chevron--down"}`}
            />
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
