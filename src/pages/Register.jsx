// src/pages/Register.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../userContext/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'citizen',
    ward: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.phone && !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectUser = (role) => {
    switch(role) {
      case 'citizen':
        navigate('/submitRequest');
        break;
      case 'operator':
        navigate('/operator/home');
        break;
      case 'wardAdmin':
      case 'superAdmin':
        navigate('/admin/home');
        break;
      default:
        navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await register(form); // expects { user, token }
      redirectUser(res.user.role);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-form'>
      <form onSubmit={handleSubmit}>
        <h1>Create your Account</h1>

        {errorMsg && <div className="error">{errorMsg}</div>}

        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Full Name" required />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@example.com" required />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 Characters" required />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Phone</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="operator">Operator</option>
          <option value="wardAdmin">Ward Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>

        <label>Ward (optional)</label>
        <input type="text" name="ward" value={form.ward} onChange={handleChange} placeholder="Ward Name/Number" />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>

        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
