import { useEffect, useState } from "react";
import "./myaccount.css";

export default function MyAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("l",JSON.stringify(false));
    window.location.href = "/"; // يحوله لصفحة تسجيل الدخول
  };
  return user?(
    <div className="account-container">
      <h1>My Account</h1>
      <div className="account-card">
        <h3>Welcome, {user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {user.createdAt || "2025"}</p>
      </div>

      <div className="account-actions">
        <a className="btn" href="/">🏠 Home</a>
        <button className="btn logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  ):(<h1>not found</h1>);
}
