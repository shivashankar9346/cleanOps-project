import React, { useState } from "react";
import { api } from "../../server/server"; // adjust path
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post("/requests", formData);
      alert("Request submitted successfully!");
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
    } catch (err) {
      console.error("Error submitting request:", err.message);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="form container">
      <form onSubmit={handleSubmit}>
        <h1>Raise Desludging Request</h1>
        <p>
          Fill in the details below. Accurate address and a short description
          helps us serve you faster.
        </p>

        <div className="row">
          <div className="field">
            <label>Full Name</label>
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
            <label>Mobile Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit Number"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Ward</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="e.g. 5"
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

        <div className="row">
          <div className="field">
            <label>Preferred Time Slot</label>
            <input
              type="text"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              placeholder="e.g. 9:00AM - 12:00PM"
            />
          </div>

          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No, Street, Area"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 19.07350"
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

        <div className="description">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the issue ..."
          />
        </div>

        <p>Avoid personal information. You can attach images below.</p>

        <div className="image">
          <label>Upload Image</label>
          <input type="file" />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequest;
