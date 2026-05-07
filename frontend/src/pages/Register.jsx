import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../api/auth";
import toast from "react-hot-toast";
import "./Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await RegisterUser({ username, password });
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Username may already be taken.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-topbar">
        <Link to="/" className="auth-logo">
          <span className="logo-name">Pace<span className="logo-accent">Up</span></span>
        </Link>
      </div>

      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Start tracking your placement prep today</p>

        <form onSubmit={handleRegister} className="auth-form">

          <div className="field">
            <label className="field-label">Username</label>
            <input
              type="text"
              className="field-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Confirm Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Create Account →
          </button>

        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
