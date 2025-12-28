// src/pages/admin/AdminAnalytics.jsx
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { api } from "../../server/api";
import "./adminAnalytics.css";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#6366f1", "#f59e0b", "#ef4444", "#10b981"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/admin/analytics");
        // console.log(res); // debug
        setData(res.data || res);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (!data) return <div className="loading">No data available</div>;

  // Ensure ward names are used
  const wardsData = (data.requestsPerWard || []).map(item => ({
    ward: item.wardName || item.ward || "Unknown", // <-- here is the key for chart
    count: item.count || 0,
  }));

  const statusData = (data.requestsPerStatus || []).map(item => ({
    status: item.status || "Unknown",
    count: item.count || 0,
  }));

  const wasteData = (data.requestsPerWaste || []).map(item => ({
    name: item.wasteType || item.name || "Unknown",
    value: item.value || 0,
  }));

  const operatorsData = (data.topOperators || []).map(item => ({
    name: item.operatorName || item.name || "Unknown",
    count: item.count || 0,
  }));

  return (
    <div className="admin-analytics">
      <h1>Admin Analytics</h1>

      <div className="charts-container">
        {/* Requests per Ward */}
        <div className="chart">
          <h2>Requests per Ward</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wardsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ward" /> {/* <-- Ward name shown here */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Requests per Status */}
        <div className="chart">
          <h2>Requests per Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Requests per Waste Type */}
        <div className="chart">
          <h2>Requests per Waste Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Operators */}
        <div className="chart">
          <h2>Top Operators</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operatorsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Stats Cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Average Completion Time</h3>
          <p>{data.avgCompletionTime ?? 0} hrs</p>
        </div>
        <div className="card warning">
          <h3>SLA Breaches</h3>
          <p>{data.slaBreaches ?? 0}</p>
        </div>
        <div className="card success">
          <h3>Total Requests</h3>
          <p>{data.totalRequests ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
