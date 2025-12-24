// src/pages/Register.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext"; // ✅ corrected path
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "citizen",
    ward: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // clear field error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // clear global error
    if (error) setError("");
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    if (form.phone && !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= REDIRECT ================= */
  const redirectUser = (role) => {
    if (role === "citizen") navigate("/raiseRequest");
    else if (role === "operator") navigate("/operator/home");
    else if (role === "wardAdmin" || role === "superAdmin")
      navigate("/admin/home");
    else navigate("/");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const user = await register(form); // ✅ returns user
      redirectUser(user.role);
    } catch (err) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {error && <div className="error">{error}</div>}

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Phone (optional)</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="operator">Operator</option>
          <option value="wardAdmin">Ward Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>

        <label>Ward (optional)</label>
        <input name="ward" value={form.ward} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
