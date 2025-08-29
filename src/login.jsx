import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="amazon-header-left-section">
          <a className="header-link">
            <img
              className="amazon-logo"
              src="images/amazon-logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </a>
        </div>
        <p className="login-subtitle">Sign in</p>
      </header>

      <main className="login-main">
        <div className="login-card">
          <h2 className="login-title">Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input login-input-email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="login-label">Password</label>
            <div className="login-password-box">
              <input
                type={show ? "text" : "password"}
                className="login-input login-input-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="login-error">{error}</p>}

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" className="login-checkbox" /> Remember me
              </label>
              <a href="#" className="login-forgot">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn login-btn-primary">
              Sign In
            </button>
            <div className="login-divider">OR</div>
            <a href="/signup" className="login-btn login-btn-secondary">
              Create a new account
            </a>
          </form>
        </div>
      </main>

      <footer className="login-footer">
        <p className="login-footer-text">
          © {new Date().getFullYear()} Amazon — All rights reserved
        </p>
      </footer>
    </div>
  );
}
