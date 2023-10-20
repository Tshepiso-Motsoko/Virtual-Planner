import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function LandingPage({ darkMode }) {
  return (
    <div className={`App landing-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Welcome to Virtual Planner!</h1>
      <p>Encouraging good habits and productivity.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}

export default LandingPage;
