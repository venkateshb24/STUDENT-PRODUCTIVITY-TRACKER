import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Check your username and password.");
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
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Log in to continue your streak</p>

        <form onSubmit={handleLogin} className="auth-form">

          <div className="field">
            <label className="field-label">Username</label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Login →
          </button>

        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
