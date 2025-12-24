import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../userContext/AuthContext";
import { api } from "../../server/api";
import "./communityList.css";

const CommunityList = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  const load = async () => {
    try {
      const data = await api.get("/community");
      setItems(data.data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="community-list">
      <div className="community-header">
        <h1>Community Projects</h1>

        {user && (
          <Link to="/community/create" className="create-btn">
            + Create Project
          </Link>
        )}
      </div>

      <ul className="project-list">
        {items.map((project) => (
          <li key={project._id} className="project-item">
            <Link to={`/community/${project._id}`}>
              <h3>{project.title}</h3>
              <p>
                <span className="chip">{project.status}</span>
                <span className="chip">{project.ward}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
