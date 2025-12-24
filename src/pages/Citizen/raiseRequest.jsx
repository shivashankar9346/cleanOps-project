import React, { useState } from "react";
import "./raiseRequest.css";

const RaiseRequest = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePhotos = (e) => {
    setPhotos([...e.target.files]);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full Name is required";
    if (!/^\d{10}$/.test(formData.phone)) return "Enter valid 10-digit phone";
    if (!formData.ward.trim()) return "Ward is required";
    if (!formData.address.trim()) return "Address is required";
    return null;
  };

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
      Object.entries(formData).forEach(([k, v]) =>
        payload.append(k, v)
      );
      photos.forEach((p) => payload.append("photos", p));

      const token = localStorage.getItem("token");

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: payload,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }

      const data = await response.json();

      setMsg(`Request submitted successfully. Ticket ID: ${data.ticketId}`);

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
      setError(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Raise Desludging Request</h1>

        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="ward" placeholder="Ward" value={formData.ward} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

        <select name="wasteType" value={formData.wasteType} onChange={handleChange}>
          <option>Sewage</option>
          <option>Household</option>
          <option>Industrial</option>
          <option>Other</option>
        </select>

        <input type="file" multiple accept="image/*" onChange={handlePhotos} />

        <textarea
          name="description"
          value={formData.description}
          maxLength={600}
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RaiseRequest;
