import React, { useState } from "react";
import { api } from "../../server/api";
import "./communityCreate.css";

const CommunityCreate = () => {
  const descriptionMax = 800;

  const [form, setForm] = useState({
    title: "",
    description: "",
    ward: "",
    address: "",
    lat: "",
    lng: "",
    wasteType: "household",
    targetDate: "",
  });

  const [photos, setPhotos] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      photos.forEach((p) => fd.append("photos", p));

      const data = await api.post("/community", fd);

      setMsg(`✅ Project created: ${data.data.title}`);
      setForm({
        title: "",
        description: "",
        ward: "",
        address: "",
        lat: "",
        lng: "",
        wasteType: "household",
        targetDate: "",
      });
      setPhotos([]);
    } catch (err) {
      setError(err.message || "❌ Failed to create project");
    }
  };

  return (
    <form className="community-create" onSubmit={onSubmit}>
      <h1>Create Project</h1>

      {msg && <div className="success">{msg}</div>}
      {error && <div className="error">{error}</div>}

      <input
        name="title"
        placeholder="Title"
        required
        value={form.title}
        onChange={onChange}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        maxLength={descriptionMax}
        placeholder="Description"
      />
      <small>{form.description.length}/{descriptionMax}</small>

      <div className="grid">
        <input name="ward" placeholder="Ward" required onChange={onChange} />
        <select name="wasteType" onChange={onChange}>
          <option>household</option>
          <option>sewage</option>
          <option>industrial</option>
          <option>other</option>
        </select>
        <input name="address" placeholder="Address" onChange={onChange} />
        <input name="lat" placeholder="Latitude" onChange={onChange} />
        <input name="lng" placeholder="Longitude" onChange={onChange} />
        <input type="date" name="targetDate" onChange={onChange} />
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => setPhotos([...e.target.files])}
      />

      <button type="submit">Create Project</button>
    </form>
  );
};

export default CommunityCreate;
