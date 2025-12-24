import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../server/api";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [items, setItems] = useState([]);
  const [operators, setOperators] = useState([]);
  const [filters, setFilters] = useState({ ward: "", status: "", wasteType: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memoized selected request
  const selectedRequest = useMemo(
    () => (items || []).find((r) => r._id === selectedId),
    [selectedId, items]
  );

  // Load dashboard summary
  const loadSummary = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");
      setSummary(data || {});
    } catch (err) {
      console.error(err);
      setSummary({});
    }
  };

  // Load requests with filters
  const loadRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/requests", { params: filters });
      const safeData = Array.isArray(data) ? data : [];
      setItems(safeData);
      if (!selectedId && safeData.length) setSelectedId(safeData[0]._id);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load operators
  const loadOperators = async () => {
    try {
      const { data } = await api.get("/admin/operators");
      setOperators(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOperators([]);
    }
  };

  // Assign operator to request
  const assignOperator = async (requestId, operatorId) => {
    try {
      await api.put(`/requests/${requestId}/assign`, { operatorId });
      loadRequests();
      loadSummary();
    } catch (err) {
      console.error(err);
    }
  };

  // Update request status
  const updateStatus = async (requestId, status) => {
    try {
      await api.put(`/requests/${requestId}/status`, { status });
      loadRequests();
      loadSummary();
    } catch (err) {
      console.error(err);
    }
  };

  // Load summary and operators on mount
  useEffect(() => {
    loadSummary();
    loadOperators();
  }, []);

  // Reload requests whenever filters change
  useEffect(() => {
    loadRequests();
  }, [filters]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div>Today's Requests: {summary.today || 0}</div>
        <div>Pending: {summary.pending || 0}</div>
        <div>Completed Today: {summary.completedToday || 0}</div>
        <div>SLA Breaches: {summary.slaBreaches || 0}</div>
      </div>

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

      {/* Split Layout */}
      <div className="split-layout">
        {/* Left Table */}
        <div className="requests-table">
          {loading ? (
            <p>Loading...</p>
          ) : (items || []).length === 0 ? (
            <p>No requests found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Citizen</th>
                  <th>Ward</th>
                  <th>Waste</th>
                  <th>Status</th>
                  <th>Assigned</th>
                </tr>
              </thead>
              <tbody>
                {(items || []).map((req) => (
                  <tr
                    key={req._id}
                    className={req._id === selectedId ? "active" : ""}
                    onClick={() => setSelectedId(req._id)}
                  >
                    <td>{req.ticketId}</td>
                    <td>{req.citizenName}</td>
                    <td>{req.ward}</td>
                    <td>{req.wasteType}</td>
                    <td>{req.status}</td>
                    <td>{req.operator?.name || "Not Assigned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Details */}
        <div className="request-details">
          {!selectedRequest ? (
            <p>Select a request to view details</p>
          ) : (
            <>
              <h2>Ticket: {selectedRequest.ticketId}</h2>
              <p>Status: {selectedRequest.status}</p>
              <p>Citizen: {selectedRequest.citizenName}</p>
              <p>Ward: {selectedRequest.ward}</p>
              <p>Waste Type: {selectedRequest.wasteType}</p>
              <p>Preferred Slot: {selectedRequest.timeSlot}</p>
              <p>Address: {selectedRequest.address}</p>
              <p>Description: {selectedRequest.description}</p>

              <label>Assign Operator</label>
              <select
                onChange={(e) => assignOperator(selectedRequest._id, e.target.value)}
                value={selectedRequest.operator?._id || ""}
              >
                <option value="">Select</option>
                {(operators || []).map((op) => (
                  <option key={op._id} value={op._id}>
                    {op.name} ({op.ward})
                  </option>
                ))}
              </select>

              <label>Update Status</label>
              <select
                onChange={(e) => updateStatus(selectedRequest._id, e.target.value)}
                value={selectedRequest.status || ""}
              >
                <option>Assigned</option>
                <option>On the Way</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Rejected</option>
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
