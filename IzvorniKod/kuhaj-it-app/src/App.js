import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes> 
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


