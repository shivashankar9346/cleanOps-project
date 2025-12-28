// src/pages/citizen/RaiseRequest.jsx
import React, { useState } from "react";
import { api } from "../../server/api";
import "./raiseRequest.css";

const RaiseRequest = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    ward: "",
    address: "",
    lat: "",
    lng: "",
    wasteType: "household",
    preferredTimeSlot: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const DESCRIPTION_MAX = 600;

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= FILE HANDLER ================= */
  const handlePhotos = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!form.fullName.trim()) return "Full Name is required";
    if (!/^\d{10}$/.test(form.mobileNumber))
      return "Enter valid 10-digit mobile number";
    if (!form.ward.trim()) return "Ward is required";
    if (!form.address.trim()) return "Address is required";
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        payload.append(key, value)
      );
      photos.forEach((p) => payload.append("photos", p));

      const res = await api.post("/requests", payload);

      setMsg(`Request submitted successfully. Ticket ID: ${res.ticketId}`);

      setForm({
        fullName: "",
        mobileNumber: "",
        ward: "",
        address: "",
        lat: "",
        lng: "",
        wasteType: "househld",
        preferredTimeSlot: "",
        description: "",
      });
      setPhotos([]);
    } catch (err) {
      setError(err.message || "Failed to submit request");
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

        <input
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="mobileNumber"
          placeholder="Mobile Number *"
          value={form.mobileNumber}
          onChange={handleChange}
        />

        <input
          name="ward"
          placeholder="Ward *"
          value={form.ward}
          onChange={handleChange}
        />

        <select
          name="wasteType"
          value={form.wasteType}
          onChange={handleChange}
        >
          <option value="household">Household</option>
          <option value="sewage">Sewage</option>
          <option value="industrial">Industrial</option>
          <option value="other">Other</option>
        </select>

        <input
          name="preferredTimeSlot"
          placeholder="Preferred Time Slot"
          value={form.preferredTimeSlot}
          onChange={handleChange}
        />

        <input
          name="lat"
          placeholder="Latitude"
          value={form.lat}
          onChange={handleChange}
        />

        <input
          name="lng"
          placeholder="Longitude"
          value={form.lng}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address *"
          value={form.address}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          maxLength={DESCRIPTION_MAX}
          onChange={handleChange}
        />
        <small>
          {form.description.length}/{DESCRIPTION_MAX}
        </small>

        <input type="file" multiple accept="image/*" onChange={handlePhotos} />

        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RaiseRequest;
