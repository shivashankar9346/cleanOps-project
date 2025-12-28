import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../userContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      {/* BRAND */}
      <div className="logo">
        <NavLink to="/" className="brand">
          CleanOps 🚛♻️
        </NavLink>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink to="/" end className="nav-item">
          Home
        </NavLink>

        <NavLink to="/community" className="nav-item">
          Community
        </NavLink>

        {role === "citizen" && (
          <>
            <NavLink to="/raise-request" className="nav-item">
              Raise Request
            </NavLink>
            <NavLink to="/my-requests" className="nav-item">
              My Requests
            </NavLink>
          </>
        )}

        {role === "operator" && (
          <NavLink to="/operator/assigned" className="nav-item">
            Assigned
          </NavLink>
        )}

        {(role === "wardAdmin" || role === "superAdmin") && (
          <>
            <NavLink to="/admin/dashboard" className="nav-item">
              Dashboard
            </NavLink>
            <NavLink to="/admin/analytics" className="nav-item">
              Analytics
            </NavLink>
            <NavLink to="/admin/operators" className="nav-item">
              Operators
            </NavLink>
          </>
        )}
      </div>

      {/* AUTH */}
      <div className="auth-links">
        {!user ? (
          <>
            <NavLink to="/login" className="nav-item login-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-item register-btn">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="user-info">Welcome, {user.name}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
