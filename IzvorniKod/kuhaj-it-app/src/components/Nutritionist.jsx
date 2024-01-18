import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, Col, Row, Button } from 'react-bootstrap';

const Nutritionist = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [ingredients, setIngredients] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [labels, setLabels] = useState([]);
  const [newIngredientInfo, setNewIngredientInfo] = useState({
    name: '',
    category: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    salt: 0,
    saturatedFat: 0,
    image: '',
    weight: '',
    labels: [],
  });
  const [dietLimits, setDietLimits] = useState({
    lowCalorie: 2000,
    lowFat: 40,
    lowCarb: 150,
    dietDescription: '',
  });

  const createDiet = () => {
    const newDiet = {
      lowCalorie: dietLimits.lowCalorie,
      lowFat: dietLimits.lowFat,
      lowCarb: dietLimits.lowCarb,
      description: dietLimits.dietDescription,
    };

    console.log('New Diet:', newDiet);
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    setCurrentUser(storedUser);
    
    fetch('/labels') // Labels for categorizing ingredients

      .then(response => response.json())
      .then(data => setLabels(data))
      .catch(error => console.error('Error fetching labels:', error));
  }, []);

  const fetchIngredients = () => {
    fetch('/ingredients') // Fetching ingredients


      .then(response => response.json())
      .then(data => setIngredients(data))
      .catch(error => console.error('Error fetching ingredients:', error));
  };


  const addIngredient = () => {
    const formData = new FormData();
    formData.append('name', newIngredientInfo.name);
    formData.append('category', newIngredientInfo.category);
    formData.append('calories', newIngredientInfo.calories);
    formData.append('protein', newIngredientInfo.protein);
    formData.append('carbs', newIngredientInfo.carbs);
    formData.append('fat', newIngredientInfo.fat);
    formData.append('sugar', newIngredientInfo.sugar);
    formData.append('salt', newIngredientInfo.salt);
    formData.append('saturatedFat', newIngredientInfo.saturatedFat);
    formData.append('image', newIngredientInfo.image);
    formData.append('weight', newIngredientInfo.weight);
    formData.append('labels', newIngredientInfo.labels.join(','));

    // Check if a new category is entered, and add it to the categories list
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
    }

    formData.append('category', newIngredientInfo.category || newCategory);

    newIngredientInfo.labels.forEach((label, index) => {
      formData.append(`labels[${index}]`, label);
    });

    fetch('/ingredients', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ingredient added successfully:', data);
        fetchIngredients(); // Fetch ingredients after adding
      })
      .catch(error => console.error('Error adding ingredient:', error));
  };


  return (
    <Container>
      <div>
        <button onClick={fetchIngredients}>Dohvati proizvode</button>
      </div>

      <div>
        <h2>Dodaj proizvod</h2>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="ingredientName">
              <Form.Label>Ime proizvoda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi ime proizvoda"
                value={newIngredientInfo.name}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientCategory">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dodijeli kategoriju proizvodu"
                value={newIngredientInfo.category}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, category: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientCalories">
              <Form.Label>Energija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi energijsku vrijednost proizvoda (u kilokalorijama)"
                value={newIngredientInfo.calories}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, calories: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientProtein">
              <Form.Label>Proteini</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu proteina"
                value={newIngredientInfo.protein}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, protein: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientCarbs">
              <Form.Label>Ugljikohidrati</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu ugljikohidrata"
                value={newIngredientInfo.carbs}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, carbs: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientFat">
              <Form.Label>Mast</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu masti"
                value={newIngredientInfo.fat}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, fat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientSugar">
              <Form.Label>Šećer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu šećera"
                value={newIngredientInfo.sugar}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, sugar: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientSalt">
              <Form.Label>Sol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu soli"
                value={newIngredientInfo.salt}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, salt: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientSaturatedFat">
              <Form.Label>Zasićene masne kiseline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu zasićenih masnih kiselina"
                value={newIngredientInfo.saturatedFat}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, saturatedFat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ingredientMass">
              <Form.Label>Masa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu (u gramima) hrane"
                value={newIngredientInfo.weight}
                onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, weight: e.target.value })}
              />
            </Form.Group>

          <Form.Group controlId="ingredientImage">
            <Form.Label>Slika proizvoda</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, image: e.target.files[0] })}
            />
          </Form.Group>

          <Form.Group controlId="ingredientLabels">
            <Form.Label>Labele</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi labele za kategorizaciju (odovjene zarezom)"
              value={newIngredientInfo.labels.join(',')}
              onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, labels: e.target.value.split(',') })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="newCategory">
              <Form.Label>Nova kategorija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi novu kategoriju"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>

          </Row>

          <Button variant="primary" type="button" onClick={addIngredient}>
            Dodaj proizvod
          </Button>
        </Form>
      </div>

      <div>
        <h2>Proizvodi</h2>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.category}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Dijete</h2>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="lowCalorie">
              <Form.Label>Limitirane kalorije</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi kalorije"
                value={dietLimits.lowCalorie}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCalorie: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowFat">
              <Form.Label>Limitirane masti</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi masti"
                value={dietLimits.lowFat}
                onChange={(e) => setDietLimits({ ...dietLimits, lowFat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowCarb">
              <Form.Label>Limitirani ugljikohidrati</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi ugljikohidrate"
                value={dietLimits.lowCarb}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCarb: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="dietDescription">
            <Form.Label>Opis dijete</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Unesi opis dijete"
              value={dietLimits.dietDescription}
              onChange={(e) => setDietLimits({ ...dietLimits, dietDescription: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={createDiet}>
            Stvori dijetu
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Nutritionist;



