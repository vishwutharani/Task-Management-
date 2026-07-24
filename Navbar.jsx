import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>📋 Task Manager</h2>
      </div>
      <div className="nav-right">
        <span className="user-badge">👤 {user?.name || "Admin"}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;