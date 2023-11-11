
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React, { useState } from 'react';

import Navigation from './components/Navigation';

import Register from './components/Register';

import Login from './components/Login';


function App() {
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterButtonClick = () => {
    setShowRegister(true);
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes> 
          <Route exact path="/login" element={<Login />}/>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>

    <div className="App">
      <Navigation onRegisterButtonClick={handleRegisterButtonClick} />
      {showRegister && <Register />}
      <Navigation />
      <Login />
    </div>
  );
}

export default App;


