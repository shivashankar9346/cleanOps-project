import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password || form.password.length < 6)
      e.password = "Minimum 6 characters";
    if (form.phone && !/^\d{10}$/.test(form.phone))
      e.phone = "Phone must be 10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const redirectUser = () => {
    navigate("/"); // ✅ ALL roles go to home
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(form);
      redirectUser();
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

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="error">{errors.password}</span>}

        <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="operator">Operator</option>
          <option value="wardAdmin">Ward Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>

        <input name="ward" placeholder="Ward (optional)" value={form.ward} onChange={handleChange} />

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
