import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../userContext/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: ''
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
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectUser = (role) => {
    switch(role) {
      case 'citizen':
        navigate('/submitRequest');
        break;
      case 'operator':
        navigate('/operatorHome');
        break;
      case 'wardAdmin':
        navigate('/adminHome');
        break;
      case 'superAdmin':
        navigate('/adminHome');
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
      const res = await login(form.email, form.password); // login returns { user, token }
      redirectUser(res.user.role);
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        {errorMsg && <div className="error">{errorMsg}</div>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@example.com" required />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 Characters" required />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
