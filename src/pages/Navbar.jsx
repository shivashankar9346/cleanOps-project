import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../userContext/AuthContext';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const role = user?.role?.toLowerCase();

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <h2>CleanOps 🚛♻️</h2>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>

        {/* CITIZEN */}
        {isLoggedIn && role === 'citizen' && (
          <>
            <NavLink to="/submit" className="nav-item">Submit Request</NavLink>
            <NavLink to="/my-requests" className="nav-item">My Requests</NavLink>
          </>
        )}

        {/* OPERATOR */}
        {isLoggedIn && role === 'operator' && (
          <NavLink to="/operator/assigned" className="nav-item">
            Assigned Requests
          </NavLink>
        )}

        {/* WARD ADMIN & SUPER ADMIN */}
        {isLoggedIn && (role === 'wardadmin' || role === 'superadmin') && (
          <>
            <NavLink to="/adminDashboard" className="nav-item">Dashboard</NavLink>
            <NavLink to="/adminAnalytics" className="nav-item">Analytics</NavLink>
            <NavLink to="/operators" className="nav-item">Operators</NavLink>
          </>
        )}

        <NavLink to="/community" className="nav-item">Community</NavLink>
      </div>

      {/* AUTH BUTTONS */}
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className="nav-item login-btn">Login</NavLink>
            <NavLink to="/register" className="nav-item register-btn">Register</NavLink>
          </>
        ) : (
          <button className="nav-item logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
