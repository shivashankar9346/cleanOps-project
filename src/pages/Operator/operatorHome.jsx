import React from 'react';
import { useAuth } from '../../userContext/AuthContext';
import './operatorHome.css';

const OperatorHome = () => {
  const { user } = useAuth();

  return (
    <div className="operator-home">
      <div className="header">
        <h1>Waste Management & Desludging</h1>
        <p>Report and track desludging services with ease. Make your ward cleaner.</p>
      </div>

      <div className="welcome-card">
        <p>Welcome back, <span className="username">{user.name}</span>!</p>
        <p>You're signed in and ready to go.</p>
      </div>
    </div>
  );
}

export default OperatorHome;
