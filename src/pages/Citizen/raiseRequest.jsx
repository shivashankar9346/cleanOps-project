// src/pages/citizen/RaiseRequest.jsx
import React, { useState } from "react";
import { api } from "../../server/api";
import "./raiseRequest.css";

const RaiseRequest = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    ward: "",
    wasteType: "household",
    preferredTimeSlot: "",
    lat: "",
    lng: "",
    address: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const DESCRIPTION_MAX = 600;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePhotos = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      photos.forEach((p) => payload.append("photos", p));

      await api.post("/requests", payload);
      setMsg("Request submitted successfully");

      setForm({
        fullName: "",
        mobileNumber: "",
        ward: "",
        wasteType: "household",
        preferredTimeSlot: "",
        lat: "",
        lng: "",
        address: "",
        description: "",
      });
      setPhotos([]);
    } catch (err) {
      setError("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="request-form" onSubmit={handleSubmit}>
        <h1>Raise Desludging Request</h1>
        <p>Fill in the details below. Accurate address 
          and a short description helps us serve you faster.</p>

        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="grid">
          <div className="field">
            <label>Full Name</label>
            <input name="fullName"
             value={form.fullName}
              onChange={handleChange} 
              placeholder="e.g. Shiva Shankar Kotte"/>
          </div>

          <div className="field">
            <label>Mobile Number</label>
            <input name="mobileNumber"
             value={form.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit Number" />
          </div>

          <div className="field">
            <label>Ward</label>
            <input name="ward"
             value={form.ward}
              onChange={handleChange} 
              placeholder="e.g.5"/>
          </div>

          <div className="field">
            <label>Waste Type</label>
            <select name="wasteType" value={form.wasteType} onChange={handleChange}>
              <option value="household">Household</option>
              <option value="sewage">Sewage</option>
              <option value="industrial">Industrial</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="field">
            <label>Preferred Time Slot</label>
            <input
              name="preferredTimeSlot"
              value={form.preferredTimeSlot}
              onChange={handleChange}
              placeholder="e.g. 9:00AM -12:00PM"
            />
          </div>

             <div className="field">
            <label>Address</label>
            <input name="address"
             value={form.address}
              onChange={handleChange}
              placeholder="House No,Street,Area" />
          </div>

          <div className="field">
            <label>Latitude</label>
            <input name="lat"
             value={form.lat}
             onChange={handleChange}
             placeholder="e.g. 19.505"
             />
          </div>

          <div className="field">
            <label>Longitude</label>
            <input name="lng"
             value={form.lng}
              onChange={handleChange}
              placeholder="72.877" />
          </div>

       

          {/* ONLY THESE TWO ARE FULL WIDTH */}
          <div className="field full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              maxLength={DESCRIPTION_MAX}
              onChange={handleChange}
              placeholder="Briefly describe the issue ..."
            />
            <small>{form.description.length}/{DESCRIPTION_MAX}</small>
            <p>Avoid personal information. You can attach images below.</p>
          </div>

          <div className="field full">
            <label>Upload Photos</label>
            <input type="file" multiple accept="image/*" onChange={handlePhotos} />
          </div>
        </div>

        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RaiseRequest;
