import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import CulinaryEnthusiast from './components/CulinaryEnthusiast';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/culinary-enthusiasts" element={<CulinaryEnthusiast />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
