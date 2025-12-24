import React, { useState } from "react";
import { api } from "../../server/api";
import "./raiseRequest.css";

const raiseRequest = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    ward: "",
    wasteType: "Sewage",
    timeSlot: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle photos
  const handlePhotos = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  // 🔹 Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full Name is required";
    if (!/^\d{10}$/.test(formData.phone)) return "Enter valid 10-digit phone";
    if (!formData.ward.trim()) return "Ward is required";
    if (!formData.address.trim()) return "Address is required";
    return null;
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );
      photos.forEach((photo) => payload.append("photos", photo));

      const res = await api.post("/requests", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(`Request submitted successfully. Ticket ID: ${res.data.ticketId}`);

      setFormData({
        fullName: "",
        phone: "",
        ward: "",
        wasteType: "Sewage",
        timeSlot: "",
        address: "",
        latitude: "",
        longitude: "",
        description: "",
      });
      setPhotos([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
  <h1>Raise Desludging Request</h1>
  <p>Fill in the details below to raise a request.</p>

  {msg && <div className="success">{msg}</div>}
  {error && <div className="error">{error}</div>}

  <div className="form-row">
    <div className="field">
      <label>Full Name *</label>
      <input name="fullName" value={formData.fullName} onChange={handleChange} />
    </div>

    <div className="field">
      <label>Mobile Number *</label>
      <input name="phone" value={formData.phone} onChange={handleChange} />
    </div>
  </div>

  <div className="form-row">
    <div className="field">
      <label>Ward *</label>
      <input name="ward" value={formData.ward} onChange={handleChange} />
    </div>

    <div className="field">
      <label>Waste Type</label>
      <select name="wasteType" value={formData.wasteType} onChange={handleChange}>
        <option>Sewage</option>
        <option>Household</option>
        <option>Industrial</option>
        <option>Other</option>
      </select>
    </div>
  </div>

  <div className="form-row">
    <div className="field">
      <label>Preferred Time Slot</label>
      <input name="timeSlot" value={formData.timeSlot} onChange={handleChange} />
    </div>

    <div className="field">
      <label>Latitude</label>
      <input name="latitude" value={formData.latitude} onChange={handleChange} />
    </div>
  </div>

  <div className="form-row">
    <div className="field">
      <label>Longitude</label>
      <input name="longitude" value={formData.longitude} onChange={handleChange} />
    </div>

     <div className="field">
    <label>Address *</label>
    <input name="address" value={formData.address} onChange={handleChange} />
  </div>

  </div>

    <div className="field">
      <label>Upload Photos</label>
      <input type="file" multiple accept="image/*" onChange={handlePhotos} />
    </div>

 

  <div className="field">
    <label>Description</label>
    <textarea
      name="description"
      value={formData.description}
      maxLength={600}
      onChange={handleChange}
    />
    <small>{formData.description.length}/600</small>
  </div>

  <button disabled={loading}>
    {loading ? "Submitting..." : "Submit Request"}
  </button>
</form>

    </div>
  );
};

export default raiseRequest;
