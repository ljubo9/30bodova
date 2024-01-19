import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';

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
    const storedUser = sessionStorage.getItem('currentUser');
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);


    fetch('https://kuhajitbackend.onrender.com/labels') //labele za kategoriziranje proizvoda
      .then(response => response.json())
      .then(data => setLabels(data))
      .catch(error => console.error('Error fetching labels:', error));
  }, []);

  const fetchIngredients = () => {
    fetch('https://kuhajitbackend.onrender.com/ingredients') // Fetching ingredients
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
    <div className="bg-light p-2 min-vh-100"> 

    <Container>
      <div className="mt-2 p-2">
        <Button onClick={fetchIngredients} variant="dark" className='mt-3'>Dohvati proizvode</Button>
      </div>

      <div>
        <h2>Dodaj proizvod</h2>
        <Form>
          <Row className="p-2">
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
              <Form.Label>Zasićene MK</Form.Label>
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
            <Form.Label className='m-1'>Slika proizvoda</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, image: e.target.files[0] })}
            />
          </Form.Group>

          <Form.Group controlId="ingredientLabels">
            <Form.Label className='m-1'>Labele</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi labele za kategorizaciju (odovjene zarezom)"
              value={newIngredientInfo.labels.join(',')}
              onChange={(e) => setNewIngredientInfo({ ...newIngredientInfo, labels: e.target.value.split(',') })}
            />
          </Form.Group>

          </Row>

          <Button variant="dark" type="button" className="mt-2 mb-2" onClick={addIngredient}>
            Dodaj proizvod
          </Button>
        </Form>
      </div>

      <div>
        <h2>Proizvodi</h2>
          {!ingredients || ingredients.length === 0 ? (
            <h4>Nema proizvoda</h4>
          ) : (<ul>
            {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.category}
            </li>
          ))}
          </ul>
          )}
      </div>

      <div>
        <h2>Dijete</h2>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="lowCalorie">
              <Form.Label className='m-2'>Limitirane kalorije</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi kalorije"
                value={dietLimits.lowCalorie}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCalorie: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowFat">
              <Form.Label className="m-2">Limitirane masti</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi masti"
                value={dietLimits.lowFat}
                onChange={(e) => setDietLimits({ ...dietLimits, lowFat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowCarb">
              <Form.Label className='m-2'>Limitirani ugljikohidrati</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi ugljikohidrate"
                value={dietLimits.lowCarb}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCarb: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="dietDescription">
            <Form.Label className='m-2'>Opis dijete</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Unesi opis dijete"
              value={dietLimits.dietDescription}
              onChange={(e) => setDietLimits({ ...dietLimits, dietDescription: e.target.value })}
            />
          </Form.Group>

          <Button variant="dark" type="button" className="mt-3" onClick={createDiet}>
            Stvori dijetu
          </Button>
        </Form>
      </div>
    </Container>
    </div>
  );
}

export default Nutritionist;

