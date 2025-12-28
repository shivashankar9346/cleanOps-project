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

  const load = async () => {
    setLoading(true);
    const res = await api.get(`/requests/${id}`);
    setReqItem(res);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const statusClass = useMemo(() => {
    if (!reqItem) return "";
    return reqItem.status.replace(/\s/g, "-").toLowerCase();
  }, [reqItem]);

  const giveFeedback = async () => {
    try {
      await api.post(`/requests/${id}/feedback`, { rating, comment });
      setMsg("Feedback submitted");
    } catch (e) {
      setMsg("Failed to submit feedback");
    }
  };

  if (!reqItem) return <p>Loading...</p>;

  return (
    <div className="request-details">
      <h1>Ticket #{reqItem.ticketId}</h1>
      <span className={`chip ${statusClass}`}>{reqItem.status}</span>

      <section>
        <h3>Citizen Details</h3>
        <p>{reqItem.fullName}</p>
        <p>{reqItem.mobileNumber}</p>
        <p>{reqItem.address}</p>
      </section>

      <section>
        <h3>Description</h3>
        <p>{reqItem.description}</p>
      </section>

      {reqItem.photos?.length > 0 && (
        <section>
          <h3>Photos</h3>
          <div className="photos">
            {reqItem.photos.map((p, i) => (
              <a key={i} href={p} target="_blank">
                <img src={p} alt="" />
              </a>
            ))}
          </div>
        </section>
      )}

      {reqItem.status === "Completed" && (
        <section>
          <h3>Feedback</h3>
          <div className="stars">
            {[1,2,3,4,5].map((n) => (
              <span key={n} onClick={() => setRating(n)}>
                {n <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
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
