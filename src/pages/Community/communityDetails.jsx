import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../userContext/AuthContext";
import { api } from "../../server/api";
import "./communityDetails.css";

const CommunityDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    const data = await api.get(`/community/${id}`);
    setProject(data.data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const join = async () => {
    await api.post(`/community/${id}/join`);
    load();
  };

  const leave = async () => {
    await api.post(`/community/${id}/leave`);
    load();
  };

  const addNote = async () => {
    const fd = new FormData();
    fd.append("note", note);

    await api.post(`/community/${id}/notes`, fd);
    setNote("");
    setMsg("Note added");
    load();
  };

  if (!project) return <p>Loading...</p>;

  const isParticipant = project.participants?.includes(user?._id);
  const isOrganizer = project.organizer === user?._id;

  return (
    <div className="community-details">
      <h1>{project.title}</h1>

      <div className="meta">
        <span>{project.status}</span>
        <span>{project.ward}</span>
      </div>

      <p className="description">{project.description}</p>

      {user && !isParticipant && (
        <button onClick={join}>Join Project</button>
      )}

      {user && isParticipant && !isOrganizer && (
        <button onClick={leave} className="leave">
          Leave Project
        </button>
      )}

      <h3>Notes</h3>
      <ul className="notes">
        {project.notes?.map((n, i) => (
          <li key={i}>{n.text}</li>
        ))}
      </ul>

      {isParticipant && (
        <div className="note-box">
          {msg && <p className="success">{msg}</p>}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
          />
          <button onClick={addNote}>Add Note</button>
        </div>
      )}
    </div>
  );
};

export default CommunityDetails;
