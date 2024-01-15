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
<<<<<<< HEAD
=======
import Nutritionist from './components/Nutritionist';
>>>>>>> ea5f3b0518e0c129d21b350e536a70c790c6efa9
import Cookbook from './components/Cookbook';
import Recipe from './components/Recipe';

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
          <Route path="/enthusiast/:username" element={<ProfileCulinaryEnthusiast />} />
          <Route path="/choose-recipe" element={<ChooseRecipe />} />
          <Route path="/nutritionist" element={<Nutritionist />} />
          <Route path="/cookbook/:culinaryId" element={<Cookbook />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
