import React, { useState, useEffect } from 'react';

const RecipeEditor = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [recipeData, setRecipeData] = useState({
    name: '',
    category: '',
    portionSize: '',
    cookTime: '',
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ number: 1, description: '', image: null }]);
  const [cookbooks, setCookbooks] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState('');

  useEffect(() => {
    const fetchCookbooks = async () => {
      try {
        //dohvaćanje kuharica po id-u entuzijasta
        const response = await fetch(`/cookbook/${currentUser.username}`);
        if (response.ok) {
          const cookbooksData = await response.json();
          setCookbooks(cookbooksData);
        } else {
          console.error('Greška prilikom dohvaćanja kuharica.');
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja kuharica:', error);
      }
    };

    fetchCookbooks();
  }, [currentUser.username]);

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
    } else {
      setRecipeData({ ...recipeData, [name]: value });
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

    try {
      const response = await fetch('/recipe', {
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

        //svaka namirnica se pojedinačno šalje na back, šalje se recipe.id i sve informaicje o namirnici
        for (const ingredient of ingredients) {
          const ingredientResponse = await fetch('/RecipeIngredient', {
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
            console.log('Podaci o namirnici uspješno poslani.');
          } else {
            console.error('Greška u zahtjevu za namirnicama');
          }
        }
        //svaki stepOfMaking se pojedinačno šalje...
        for (const step of steps) {
          const stepResponse = await fetch('/StepOfMaking', {
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
            console.error('Greška u zahtjevu za koracima pripreme');
          }
        }
        //ako je uopće odabrana kuharica,na endpoint cookbook se šalje id recepta i id kuharice i onda se taj recept doda u recepte od kuharice
        if (selectedCookbook) {
          const cookbookResponse = await fetch('/cookbook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeId: responseData.id,
              cookbookId: selectedCookbook,
              // selectedCookbook je zapravo id kuharice
            }),
          });

          if (cookbookResponse.ok) {
            console.log('Recept dodan u kuharicu.');
          } else {
            console.error('Greška prilikom dodavanja recepta u kuharicu.');
          }
        }




      } else {
        console.error('Greška prilikom slanja recepta');
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
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </label>
        <br />
        <label>
          Kategorija:
          <input
            type="text"
            name="category"
            value={recipeData.category}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </label>
        <br />
        <label>
          Veličina porcije:
          <input
            type="text"
            name="portionSize"
            value={recipeData.portionSize}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </label>
        <br />
        <label>
          Vrijeme kuhanja:
          <input
            type="text"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </label>
        <br />

        <h3>Dodaj namirnice:</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>
              Naziv namirnice:
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleInputChange(e, index, 'ingredients')}
              />
            </label>
            <label>
              Količina:
              <input
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleInputChange(e, index, 'ingredients')}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addIngredientRow}>
          Dodaj namirnicu
        </button>

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

        <label>
          Odaberi kuharicu:
          <select
            name="selectedCookbook"
            value={selectedCookbook}
            onChange={(e) => setSelectedCookbook(e.target.value)}
          >
            <option value="" disabled>
              Odaberi kuharicu
            </option>
            {cookbooks.map((cookbook) => (
              <option key={cookbook.id} value={cookbook.id}>
                {cookbook.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Dodaj recept</button>
      </form>
    </div>
  );
};

export default RecipeEditor;
