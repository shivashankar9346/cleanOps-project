import React from 'react'
import './submitRequest.css'

const SubmitRequest = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call will be added later
    alert('Request submitted (UI only)')
  }

  return (
    <div className="form container">
      <form onSubmit={handleSubmit}>
        <h1>Raise Desludging Request</h1>
        <p>
          Fill in the details below. Accurate address
          and a short description helps us serve you faster.
        </p>

        <div className="row">
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. Deepak Giri" required />
          </div>

          <div className="field">
            <label>Mobile Number</label>
            <input type="text" placeholder="10-digit Number" required />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Ward</label>
            <input type="text" placeholder="e.g. 5" />
          </div>

          <div className="field">
            <label>Waste Type</label>
            <select>
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
            <input type="text" placeholder="e.g. 9:00AM - 12:00PM" />
          </div>

          <div className="field">
            <label>Address</label>
            <input type="text" placeholder="House No, Street, Area" />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Latitude</label>
            <input type="text" placeholder="e.g. 19.07350" />
          </div>

          <div className="field">
            <label>Longitude</label>
            <input type="text" placeholder="e.g. 72.2345" />
          </div>
        </div>

        <div className="description">
          <label>Description</label>
          <textarea placeholder="Briefly describe the issue ..." />
        </div>

        <p>Avoid personal information. You can attach images below.</p>

        <div className="image">
          <label>Upload Image</label>
          <input type="file" />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  )
}

export default SubmitRequest
