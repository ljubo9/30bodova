import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const RecipeEditor = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  console.log(currentUser);
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
        const response = await fetch(`/cookbook/get/${currentUser.id}`);
        if (response.ok) {
          const cookbooksData = await response.json();
          setCookbooks(cookbooksData);
          console.log(cookbooksData);
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
      console.log(recipeData);
      const form = new FormData();

      form.append("categoryName", recipeData.category);
      form.append("cookTime", recipeData.cookTime);
      form.append("portionSize", recipeData.portionSize);
      form.append("name", recipeData.name);
      form.append("username", currentUser.username);



      const response = await fetch(`/recipe`, {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.id);

        for (const ingredient of ingredients) {

          const form = new FormData()
          form.append("recipeId", responseData.id);
          form.append("ingredientName", ingredient.name);
          form.append("ingredientQuantity", ingredient.quantity);
          
          const ingredientResponse = await fetch('/RecipeIngredient', {
            method: 'POST',
            body: form
          });

          if (ingredientResponse.ok) {
            console.log('Podaci o namirnici uspješno poslani.');
          } else {
            console.error('Greška u zahtjevu za namirnicama');
          }
        }

        for (const step of steps) {
          const form = new FormData();
          form.append("recipeId", responseData.id);
          form.append("stepNumber", step.number);
          form.append("stepDescription", step.description);
          form.append("stepImage", step.image);
          const stepResponse = await fetch('/StepOfMaking', {
            method: 'POST',
            body: form
        });

          if (stepResponse.ok) {
            console.log('Podaci o koraku pripreme uspješno poslani.');
          } else {
            console.error('Greška u zahtjevu za koracima pripreme');
          }
        }

        if (selectedCookbook) {
          const cookbookResponse = await fetch('/cookbook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeId: responseData.id,
              cookbookId: selectedCookbook,
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
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formRecipeName">
          <Form.Label column sm={2}>
            Ime recepta:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={recipeData.name}
              onChange={(e) => handleInputChange(e, null, null)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRecipeCategory">
          <Form.Label column sm={2}>
            Kategorija:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="category"
              value={recipeData.category}
              onChange={(e) => handleInputChange(e, null, null)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRecipePortionSize">
          <Form.Label column sm={2}>
            Veličina porcije:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="portionSize"
              value={recipeData.portionSize}
              onChange={(e) => handleInputChange(e, null, null)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRecipeCookTime">
          <Form.Label column sm={2}>
            Vrijeme kuhanja:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="cookTime"
              value={recipeData.cookTime}
              onChange={(e) => handleInputChange(e, null, null)}
            />
          </Col>
        </Form.Group>

        <h3>Dodaj namirnice:</h3>
        {ingredients.map((ingredient, index) => (
          <Row key={index}>
            <Col>
              <Form.Control
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleInputChange(e, index, 'ingredients')}
                placeholder="Naziv namirnice"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleInputChange(e, index, 'ingredients')}
                placeholder="Količina"
              />
            </Col>
          </Row>
        ))}
        <Button type="button" onClick={addIngredientRow}>
          Dodaj namirnicu
        </Button>

        <Form.Group controlId="formCookbook">
          <Form.Label>Odaberi kuharicu:</Form.Label>
          <Form.Control
            as="select"
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
          </Form.Control>
        </Form.Group>

        <Button type="submit">Dodaj recept</Button>
      </Form>
    </div>
  );
};

export default RecipeEditor;