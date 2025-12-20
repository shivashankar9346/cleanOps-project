import React, { useEffect, useState } from "react";
import { api } from "../../server/server"; // adjust path
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    todayRequests: 0,
    pending: 0,
    completedToday: 0,
    slaBreaches: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    ward: "All",
    status: "All",
    wasteType: "All",
  });

  // 🔹 Load summary
  const loadSummary = async () => {
    try {
      const data = await api.get("/admin/dashboard");
      setSummary({
        todayRequests: data.todayRequests || 0,
        pending: data.pending || 0,
        completedToday: data.completedToday || 0,
        slaBreaches: data.slaBreaches || 0,
      });
    } catch (err) {
      console.error("Error loading summary:", err.message);
    }
  };

  // 🔹 Load requests
  const loadRequests = async () => {
    setLoading(true);
    try {
      const query = `?ward=${filters.ward}&status=${filters.status}&wasteType=${filters.wasteType}`;
      const data = await api.get("/requests" + query);
      setRequests(data.data || []);
    } catch (err) {
      console.error("Error loading requests:", err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    loadRequests();
  }, [filters]); // refetch when filters change

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Summary cards */}
      <div className="summary-grid">
        <div className="card">
          <p>Today's Requests</p>
          <h3>{summary.todayRequests}</h3>
        </div>
        <div className="card">
          <p>Pending</p>
          <h3>{summary.pending}</h3>
        </div>
        <div className="card">
          <p>Completed Today</p>
          <h3>{summary.completedToday}</h3>
        </div>
        <div className="card danger">
          <p>SLA Breaches</p>
          <h3>{summary.slaBreaches}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.ward}
          onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
        >
          <option>All</option>
          <option>Ward 1</option>
          <option>Ward 2</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          value={filters.wasteType}
          onChange={(e) =>
            setFilters({ ...filters, wasteType: e.target.value })
          }
        >
          <option>All</option>
          <option>Household</option>
          <option>Sewage</option>
          <option>Industrial</option>
        </select>
      </div>

      {/* Requests table */}
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Citizen</th>
              <th>Ward</th>
              <th>Waste Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.ticketId}</td>
                <td>{req.fullName || req.name}</td>
                <td>{req.ward}</td>
                <td>{req.wasteType}</td>
                <td>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
