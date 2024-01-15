import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { recipeId } = useParams();

  // Ovdje možete koristiti recipeId kako biste dohvatili podatke o receptu

  return (
    <div>
      <h2>Recipe</h2>
      <p>Recipe ID: {recipeId}</p>
      {/* ... */}
    </div>
  );
};

export default Recipe;