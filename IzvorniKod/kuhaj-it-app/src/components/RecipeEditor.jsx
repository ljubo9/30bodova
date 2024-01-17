import React, { useState } from 'react';

const RecipeEditor = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    category: '',
    portionSize: '',
    cookTime: '',
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ number: 1, description: '', image: null }]);

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;

    if (type === 'ingredients') {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
      setIngredients(updatedIngredients);
    } else if (type === 'steps') {
      const updatedSteps = [...steps];
      updatedSteps[index] = { ...updatedSteps[index], [name]: value };
      setSteps(updatedSteps);
    }
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const addStepRow = () => {
    const newStepNumber = steps.length + 1;
    setSteps([...steps, { number: newStepNumber, description: '', image: null }]);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const updatedSteps = [...steps];
      updatedSteps[index] = { ...updatedSteps[index], image: file };
      setSteps(updatedSteps);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    try {
      const response = await fetch('https://kuhajitbackend.onrender.com/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipeData,
          username: currentUser.username,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.id);

        // Slanje podataka o namirnicama
        for (const ingredient of ingredients) {
          const ingredientResponse = await fetch('https://kuhajitbackend.onrender.com/RecipeIngredient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeId: responseData.id,
              ingredient,
            }),
          });

          if (ingredientResponse.ok) {
            console.log('Podaci o namirnici uspješno poslani.')
          } else {
            console.error('error u zahtjevu');
          }
        }

        for (const step of steps) {
          const stepResponse = await fetch('https://kuhajitbackend.onrender.com/StepOfMaking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeId: responseData.id,
              step,
            }),
          });

          if (stepResponse.ok) {
            console.log('Podaci o koraku pripreme uspješno poslani.');

          } else {
            console.error('greška');
          }
        }
      } else {
        console.error('greška');
      }
    } catch (error) {
      console.error('Greška prilikom slanja zahtjeva:', error);
    }
  };

  return (
    <div>
      <h2>Dodaj recept</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Ime recepta:
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Kategorija:
          <input
            type="text"
            name="category"
            value={recipeData.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Veličina porcije:
          <input
            type="text"
            name="portionSize"
            value={recipeData.portionSize}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Vrijeme kuhanja:
          <input
            type="text"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={handleInputChange}
          />
        </label>
        <br />

        
        <h3>Dodaj namirnice:</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
        
          </div>
        ))}
        <button type="button" onClick={addIngredientRow}>
          Dodaj namirnicu
        </button>
        
        {/* Unos za korake pripreme */}
        <h3>Dodaj korake pripreme:</h3>
        {steps.map((step, index) => (
          <div key={index}>
            <label>
              Redni broj koraka: {step.number}
            </label>
            <label>
              Opis koraka:
              <input
                type="text"
                name="description"
                value={step.description}
                onChange={(e) => handleInputChange(e, index, 'steps')}
                required
              />
            </label>
            <label>
              Slika:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addStepRow}>
          Dodaj korak pripreme
        </button>
        
        <button type="submit">Dodaj recept</button>
      </form>
    </div>
  );
};

export default RecipeEditor;
