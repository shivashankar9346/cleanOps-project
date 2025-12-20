import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../server/server';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    // assume res = { user, token }
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
    setUser(res.user);
    setIsLoggedIn(true);
    return res;
  };

  const register = async (formData) => {
    const res = await registerUser(formData);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
    setUser(res.user);
    setIsLoggedIn(true);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
