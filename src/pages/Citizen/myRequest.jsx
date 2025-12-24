import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../server/api";
import "./myRequest.css";

const MyRequests = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/requests");
        setItems(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-requests">
      <div className="header">
        <h1>My Requests</h1>
        <Link to="/raise-request" className="btn">
          Raise Request
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          <p>No requests yet</p>
          <Link to="/raise-request">Raise your first request</Link>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Ward</th>
              <th>Waste</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id}>
                <td>{r.ticketId}</td>
                <td>{r.ward}</td>
                <td>{r.wasteType}</td>
                <td>
                  <span className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <Link to={`/requests/${r._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequests;
