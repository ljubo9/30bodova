import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="https://kuhajitbackend.onrender.com/login" element={<Login />} />
          <Route path="https://kuhajitbackend.onrender.com/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
