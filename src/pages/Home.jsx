import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiPlusCircle, FiList, FiBarChart2 } from "react-icons/fi";
import "./Home.css";
import { useAuth } from "../userContext/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role;

  const handleProtectedNav = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const isAdmin = role === "wardAdmin" || role === "superAdmin";
  const isCitizen = role === "citizen";
  const isOperator = role === "operator";

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <h1>Waste Management & Desludging</h1>
        <p>Report and track desludging services with ease. Make your ward cleaner.</p>
      </section>

      {/* WELCOME */}
      {user && (
        <section className="welcome-card">
          <h2>
            Welcome back, {user.name}! ({user.role})
          </h2>
          <p>You’re signed in and ready to go.</p>
        </section>
      )}

      {/* QUICK ACTIONS */}
      <section className="cards-container">
        {/* Citizen */}
        {isCitizen && (
          <>
            <div className="home-card" onClick={() => handleProtectedNav("/raise-request")}>
              <FiPlusCircle size={32} />
              <h3>Raise Request</h3>
              <p>Submit a desludging request quickly.</p>
            </div>

            <div className="home-card" onClick={() => handleProtectedNav("/my-requests")}>
              <FiList size={32} />
              <h3>My Requests</h3>
              <p>Track your submitted requests.</p>
            </div>
          </>
        )}

        {/* Admin */}
        {isAdmin && (
          <>
            <NavLink to="/admin/dashboard" className="home-card">
              <FiBarChart2 size={32} />
              <h3>Admin Dashboard</h3>
              <p>Monitor ward requests and SLA.</p>
            </NavLink>

            <NavLink to="/admin/analytics" className="home-card">
              <FiBarChart2 size={32} />
              <h3>Admin Analytics</h3>
              <p>Analyze trends and performance.</p>
            </NavLink>

            <NavLink to="/admin/operators" className="home-card">
              <FiList size={32} />
              <h3>Operators</h3>
              <p>Manage operators in your ward.</p>
            </NavLink>
          </>
        )}

        
        {isOperator && (
          <div className="home-card" onClick={() => handleProtectedNav("/operator/assigned")}>
            <FiList size={32} />
            <h3>Assigned Requests</h3>
            <p>View requests assigned to you.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
