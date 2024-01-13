import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Register from './components/Register';
import HomePage from './components/HomePage';
import ProfileEdit from './components/ProfileEdit';
import CulinaryEnthusiast from './components/CulinaryEnthusiast';
import ProfileCulinaryEnthusiast from './components/ProfileCulinaryEnthusiast';
import LoggedHomePage from './components/LoggedHomePage';
import ChooseRecipe from './components/ChooseRecipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<LoggedHomePage />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/culinary-enthusiasts" element={<CulinaryEnthusiast />} />
          <Route path="/enthusiast/:username" element={<ProfileCulinaryEnthusiast />} /> {/* ruta za prikazivanje profil kulinarskog entuzijasta */}
          <Route path="/choose-recipe" element={<ChooseRecipe />} /> {/* ruta za prikazivanje odabranih recepata */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
