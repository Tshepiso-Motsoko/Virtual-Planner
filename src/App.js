import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSessionActive, setSessionActive] = useState(true);

  const handleLogout = () => {
    alert('Looking forward to more productivity in the next session');
    setSessionActive(false);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button onClick={handleLogout}>
          Logout
        </button>
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/dashboard" element={isSessionActive ? <Dashboard darkMode={darkMode} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

