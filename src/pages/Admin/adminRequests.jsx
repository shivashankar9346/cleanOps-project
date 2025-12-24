import React, { useState, useEffect } from "react";
import {api} from "../../server/api";
import "./adminRequests.css";

const AdminRequests = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ ward: "", status: "", wasteType: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all requests
  const loadRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/requests", { params: filters });
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh whenever filters change
  useEffect(() => {
    loadRequests();
  }, [filters]);

  return (
    <div className="admin-requests">
      <h1>All Requests</h1>

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Ward"
          value={filters.ward}
          onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>Assigned</option>
          <option>On the Way</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
        <select
          value={filters.wasteType}
          onChange={(e) => setFilters({ ...filters, wasteType: e.target.value })}
        >
          <option value="">All Waste Types</option>
          <option>Sewage</option>
          <option>Household</option>
          <option>Industrial</option>
          <option>Other</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="requests-table">
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No requests found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Citizen</th>
                <th>Ward</th>
                <th>Waste Type</th>
                <th>Status</th>
                <th>Assigned Operator</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {items.map((req) => (
                <tr key={req._id}>
                  <td>{req.ticketId}</td>
                  <td>{req.citizenName}</td>
                  <td>{req.ward}</td>
                  <td>{req.wasteType}</td>
                  <td>{req.status}</td>
                  <td>{req.operator?.name || "Not Assigned"}</td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;
