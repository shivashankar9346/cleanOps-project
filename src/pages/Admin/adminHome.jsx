import React from 'react';
import './adminHome.css';
import { useAuth } from '../../userContext/AuthContext';

const AdminHome = () => {
  const { user } = useAuth();

  return (
    <div className="admin-home-container">

      {/* Header */}
      <div className="admin-home-header">
        <h1>Waste Management & Desludging</h1>
        <h3>Report and track desludging services with ease. Make your ward cleaner.</h3>
      </div>

      {/* Welcome card */}
      <div className="admin-welcome-card">
        <p>Welcome back, <span className="username">{user.name}</span>!</p>
        <p>You're signed in and ready to go.</p>
      </div>

      {/* Admin dashboard cards */}
      <div className="admin-home">
        <div className="admin-card">
          <h2>Admin Dashboard</h2>
          <p>Manage assignments and view ward analytics.</p>
          <button className="admin-btn" disabled>Coming Soon</button>
        </div>

        <div className="admin-card">
          <h2>Admin Analytics</h2>
          <p>Analyze ward activity, performance, and trends.</p>
          <button className="admin-btn" disabled>Coming Soon</button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
