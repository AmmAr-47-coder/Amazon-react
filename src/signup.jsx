import { useState } from "react";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const user = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    };
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="signup-container">
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

          <button type="submit" className="signup-btn">
            Create your Amazon account
          </button>
        </form>

        <p className="signin-link">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
