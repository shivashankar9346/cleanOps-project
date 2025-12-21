import React from "react";
import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../userContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role?.toLowerCase();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // 🔹 ROLE HOME PATH
  const getRoleHome = () => {
    if (role === "citizen") return "/submitRequest";
    if (role === "operator") return "/operatorHome";
    if (role === "admin" || role === "wardadmin" || role === "superadmin")
      return "/adminHome";
    return "/";
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <h2>CleanOps 🚛♻️</h2>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        {/* 🔹 NORMAL HOME (ONLY WHEN NOT LOGGED IN) */}
        {!user && (
          <NavLink to="/" end className="nav-item">
            Home
          </NavLink>
        )}

        {/* 🔹 ROLE HOME (ONLY WHEN LOGGED IN) */}
        {user && (
          <NavLink
            to={getRoleHome()}
            className={`nav-item ${
              location.pathname.startsWith(getRoleHome())
                ? "active"
                : ""
            }`}
          >
            {role === "citizen" && "Citizen Home"}
            {role === "operator" && "Operator Home"}
            {(role === "admin" ||
              role === "wardadmin" ||
              role === "superadmin") &&
              "Admin Home"}
          </NavLink>
        )}

        {/* COMMUNITY */}
        <NavLink to="/community" end className="nav-item">
          Community
        </NavLink>

        {/* CITIZEN */}
        {user && role === "citizen" && (
          <>
            <NavLink to="/raise-request" end className="nav-item">
              Raise Request
            </NavLink>
            <NavLink to="/my-requests" end className="nav-item">
              My Requests
            </NavLink>
          </>
        )}

        {/* OPERATOR */}
        {user && role === "operator" && (
          <NavLink to="/operator/assigned" end className="nav-item">
            Assigned
          </NavLink>
        )}

        {/* ADMIN */}
        {user &&
          (role === "admin" ||
            role === "wardadmin" ||
            role === "superadmin") && (
            <>
              <NavLink to="/admin/dashboard" end className="nav-item">
                Dashboard
              </NavLink>
              <NavLink to="/admin/analytics" end className="nav-item">
                Analytics
              </NavLink>
              <NavLink to="/admin/operators" end className="nav-item">
                Operators
              </NavLink>
            </>
          )}
      </div>

      {/* AUTH */}
      <div className="auth-links">
        {!user ? (
          <>
            <NavLink to="/login" end className="nav-item login-btn">
              Login
            </NavLink>
            <NavLink to="/register" end className="nav-item register-btn">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="user-info">
              {user.name} ({user.role})
            </span>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
