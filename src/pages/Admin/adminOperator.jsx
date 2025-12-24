import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../server/api"; // Make sure api is exported as named
import "./adminOperator.css";

const AdminOperators = () => {
  const [operators, setOperators] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", ward: "" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Fetch operators from backend
  const loadOperators = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // assuming token is stored here
      const { data } = await api.get("/admin/operators", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOperators(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load operators:", err.response?.data || err.message);
      setOperators([]);
      setError("Failed to load operators. Check API endpoint or token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOperators();
  }, []);

  // Filtered operators for search
  const filteredOperators = useMemo(() => {
    const q = search.toLowerCase().trim();
    return (operators || []).filter(
      (op) =>
        op.name.toLowerCase().includes(q) ||
        op.email.toLowerCase().includes(q) ||
        op.phone.includes(q) ||
        op.ward.toLowerCase().includes(q)
    );
  }, [operators, search]);

  // Handle form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create new operator
  const createOperator = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const token = localStorage.getItem("token"); // ensure auth token is used
      await api.post("/admin/operators", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Operator created successfully!");
      setForm({ name: "", email: "", password: "", phone: "", ward: "" });
      loadOperators();
    } catch (err) {
      console.error("Failed to create operator:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create operator");
    }
  };

  return (
    <div className="admin-operators">
      <h1>Operators Management</h1>

      {msg && <div className="success">{msg}</div>}
      {error && <div className="error">{error}</div>}

      <div className="split-layout">
        {/* Form to add operator */}
        <form className="operator-form" onSubmit={createOperator}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <input name="ward" placeholder="Ward" value={form.ward} onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Create Operator"}</button>
        </form>

        {/* List of operators */}
        <div className="operator-list">
          <input
            placeholder="Search by name, email, phone, ward"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading ? (
            <p>Loading operators...</p>
          ) : filteredOperators.length === 0 ? (
            <p>No operators found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Ward</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredOperators.map((op) => (
                  <tr key={op._id}>
                    <td>{op.name}</td>
                    <td>{op.email}</td>
                    <td>{op.phone}</td>
                    <td>{op.ward}</td>
                    <td>{new Date(op.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOperators;
