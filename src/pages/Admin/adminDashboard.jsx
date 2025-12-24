import React, { useEffect, useState } from "react";
import { api } from "../../server/api";
import "./adminDashboard.css";

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

  /* =========================
     Load Summary
  ========================== */
  const loadSummary = async () => {
    try {
      const data = await api.get("/admin/dashboard");
      setSummary({
        todayRequests: data?.todayRequests ?? 0,
        pending: data?.pending ?? 0,
        completedToday: data?.completedToday ?? 0,
        slaBreaches: data?.slaBreaches ?? 0,
      });
    } catch (err) {
      console.error("Summary load failed:", err.message);
    }
  };

  /* =========================
     Load Requests
  ========================== */
  const loadRequests = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        ward: filters.ward,
        status: filters.status,
        wasteType: filters.wasteType,
      }).toString();

      const data = await api.get(`/admin/requests?${query}`);
      setRequests(data?.data || data || []);
    } catch (err) {
      console.error("Requests load failed:", err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Effects
  ========================== */
  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    loadRequests();
  }, [filters]);

  /* =========================
     Manual Refresh
  ========================== */
  const handleRefresh = () => {
    loadSummary();
    loadRequests();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* ================= SUMMARY ================= */}
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

      {/* ================= FILTERS ================= */}
      <div className="filters">
        <select
          value={filters.ward}
          onChange={(e) =>
            setFilters({ ...filters, ward: e.target.value })
          }
        >
          <option value="All">All Wards</option>
          <option value="1">Ward 1</option>
          <option value="2">Ward 2</option>
          <option value="3">Ward 3</option>
          <option value="4">Ward 4</option>
          <option value="5">Ward 5</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.wasteType}
          onChange={(e) =>
            setFilters({ ...filters, wasteType: e.target.value })
          }
        >
          <option value="All">All Waste Types</option>
          <option value="Household">Household</option>
          <option value="Sewage">Sewage</option>
          <option value="Industrial">Industrial</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {/* ================= TABLE ================= */}
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
                <td>{req.ticketId || "—"}</td>
                <td>{req.fullName || req.name || "—"}</td>
                <td>{req.ward}</td>
                <td>{req.wasteType}</td>
                <td>
                  <span
                    className={`status ${
                      req.status ? req.status.toLowerCase() : ""
                    }`}
                  >
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
