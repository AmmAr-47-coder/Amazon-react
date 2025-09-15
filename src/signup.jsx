import { useState } from "react";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="signup-container">
      <header className="login-header creat">
        <div className="amazon-header-left-section">
          <a className="header-link">
            <img
              className="amazon-logo"
              src="images/amazon-logo-white.png"
              alt="Amazon Logo"
              onClick={()=>window.location.href = "/"}
            />
            <img
              className="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </a>
        </div>
        <p className="login-subtitle">Sign up</p>
      </header>

      {success && (
        <h1 className="mmm">Your account has been created</h1>
      )}

      <div className="signup-box">
        <h1 className="signup-title">Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Your name</label>
            <input
              type="text"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Re-enter password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="submit"
            className="signup-btn"
            value="Create your Amazon account"
          />
        </form>

        <p className="signin-link">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      <footer className="login-footer fff">
        <p className="login-footer-text">
          © {new Date().getFullYear()} Amazon — All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default Signup;
