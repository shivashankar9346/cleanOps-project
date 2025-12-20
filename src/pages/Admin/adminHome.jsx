import React from 'react'
import { NavLink } from 'react-router-dom'
import './adminHome.css'

const AdminHome = () => {
  return (
    <div className="admin-home">

      <div className="admin-card">
        <h2>Admin Dashboard</h2>
        <p>Manage assignments and view ward analytics.</p>
        <NavLink to="/AdminDashboard" className="admin-btn">
          Open Dashboard
        </NavLink>
      </div>

      <div className="admin-card">
        <h2>Admin Analytics</h2>
        <p>Analyze ward activity, performance and trends.</p>
        <NavLink to="/AdminAnalytics" className="admin-btn">
          Open Analytics
        </NavLink>
      </div>

    </div>
  )
}

export default AdminHome
