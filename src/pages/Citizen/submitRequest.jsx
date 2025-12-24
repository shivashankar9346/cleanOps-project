import React, { useState } from "react";
import { api } from "../../server/api";
import "./submitRequest.css";

const SubmitRequest = () => {
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
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full Name is required";
    if (!/^\d{10}$/.test(formData.phone)) return "Enter valid 10-digit phone";
    if (!formData.ward) return "Ward is required";
    if (!formData.address.trim()) return "Address is required";
    return null;
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      await api.post("/requests", payload);

      alert("Request submitted successfully!");

      // Reset form
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
        image: null,
      });
    } catch (err) {
      console.error("Submit error:", err.message);
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Raise Desludging Request</h1>
        <p>
          Fill in the details below. Accurate information helps us serve you
          faster.
        </p>

        {/* Row 1 */}
        <div className="row">
          <div className="field">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Deepak Giri"
              required
            />
          </div>

          <div className="field">
            <label>Mobile Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="field">
            <label>Ward *</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="e.g. 5"
              required
            />
          </div>

          <div className="field">
            <label>Waste Type</label>
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
            >
              <option>Sewage</option>
              <option>Household</option>
              <option>Industrial</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="field">
            <label>Preferred Time Slot</label>
            <input
              type="text"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              placeholder="e.g. 9:00 AM - 12:00 PM"
            />
          </div>

          <div className="field">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No, Street, Area"
              required
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="row">
          <div className="field">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 19.0735"
            />
          </div>

          <div className="field">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g. 72.2345"
            />
          </div>
        </div>

        {/* Description */}
        <div className="field full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the issue..."
          />
        </div>

        {/* Image */}
        <div className="field">
          <label>Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default SubmitRequest;
