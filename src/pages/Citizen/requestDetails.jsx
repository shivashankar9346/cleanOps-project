import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../server/api";
import "./requestDetails.css";

const RequestDetails = () => {
  const { id } = useParams();
  const [reqItem, setReqItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/requests/${id}`);
        setReqItem(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const statusClass = useMemo(() => {
    if (!reqItem) return "";
    return reqItem.status.toLowerCase().replace(" ", "-");
  }, [reqItem]);

  const giveFeedback = async () => {
    try {
      setLoading(true);
      await api.post(`/requests/${id}/feedback`, { rating, comment });
      setMsg("Feedback submitted successfully");
    } catch (err) {
      setMsg("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  if (!reqItem || loading) return <p>Loading...</p>;

  return (
    <div className="request-details">
      <h1>Ticket #{reqItem.ticketId}</h1>
      <span className={`status-chip ${statusClass}`}>{reqItem.status}</span>

      <section>
        <h3>Citizen Details</h3>
        <p>Name: {reqItem.fullName}</p>
        <p>Phone: {reqItem.phone}</p>
        <p>Address: {reqItem.address}</p>
        <p>Coordinates: {reqItem.latitude}, {reqItem.longitude}</p>
      </section>

      <section>
        <h3>Description</h3>
        <p>{reqItem.description}</p>
      </section>

      <section>
        <h3>Photos</h3>
        {reqItem.photos?.length ? (
          reqItem.photos.map((p, i) => (
            <a key={i} href={p} target="_blank" rel="noreferrer">
              <img src={p} alt="upload" />
            </a>
          ))
        ) : (
          <p>No photos</p>
        )}
      </section>

      {reqItem.status === "Completed" && (
        <section>
          <h3>Give Feedback</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={s <= rating ? "active" : ""}
                onClick={() => setRating(s)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your feedback"
          />
          <button onClick={giveFeedback} disabled={loading}>
            Submit Feedback
          </button>
          {msg && <p>{msg}</p>}
        </section>
      )}
    </div>
  );
};

export default RequestDetails;
