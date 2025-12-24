import React, { useEffect, useState } from "react";
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
import{api} from "../../server/api";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get("/admin/analytics");
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="admin-analytics">
      <h1>Admin Analytics</h1>

      {/* Requests per Ward */}
      <div className="chart">
        <h2>Requests per Ward</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.requestsPerWard}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ward" />
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
          <BarChart data={data.requestsPerStatus}>
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
              data={data.requestsPerWaste}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.requestsPerWaste.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#6366f1", "#f59e0b", "#ef4444", "#10b981"][index % 4]} />
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
          <BarChart data={data.topOperators}>
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
  );
};

export default AdminAnalytics;
