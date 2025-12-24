import React, { useState, useEffect } from "react";
import { api } from "../../server/api";
import "./operatorAssigned.css";

const OperatorAssigned = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  // 🔹 Load assigned requests from API
  const load = async () => {
    try {
      setLoading(true);
      const query = status !== "All" ? `?status=${status}` : "";
      const res = await api.get(`/requests/my/assigned${query}`);
      setItems(res.data || []);
    } catch (err) {
      console.error("Error fetching assigned requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update request status
  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/requests/${id}/status`, { status: newStatus });
      load(); // refresh data
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  // 🔹 Reload when status filter changes
  useEffect(() => {
    load();
  }, [status]);

  return (
    <div className="operator-assigned">
      <div className="header">
        <h1>Assigned Requests</h1>
        <div className="filter">
          <label>Status Filter:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Assigned</option>
            <option>On the Way</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No assigned requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Ward</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.ticketId}</td>
                <td>{item.ward}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {["On the Way", "In Progress", "Completed", "Rejected"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(item._id, s)}
                      disabled={item.status === "Completed" || item.status === "Rejected"}
                    >
                      {s}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OperatorAssigned;
