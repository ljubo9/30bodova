import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Register from './components/Register';


function App() {
const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser'));
  return (
    <Router>
      <div className="App">
         <Navigation currentUser={currentUser} />
        <Routes>
          <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} />}/>
          <Route exact path="/register" element={<Register />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;