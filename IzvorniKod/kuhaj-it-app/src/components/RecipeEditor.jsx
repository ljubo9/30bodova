import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

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
        //dohvaćanje kuharica po id-u entuzijasta
        console.log(currentUser)
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
    <Container className="mt-4">
      <h2>Dodaj recept</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeName">
          <Form.Label>Ime recepta:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={recipeData.name}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </Form.Group>

        <Form.Group controlId="recipeCategory">
          <Form.Label>Kategorija:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={recipeData.category}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </Form.Group>

        <Form.Group controlId="portionSize">
          <Form.Label>Veličina porcije:</Form.Label>
          <Form.Control
            type="text"
            name="portionSize"
            value={recipeData.portionSize}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </Form.Group>

        <Form.Group controlId="cookTime">
          <Form.Label>Vrijeme kuhanja:</Form.Label>
          <Form.Control
            type="text"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={(e) => handleInputChange(e, null, null)}
          />
        </Form.Group>

        <h3>Dodaj namirnice:</h3>
        {ingredients.map((ingredient, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`ingredientName${index}`}>
                <Form.Label>Naziv namirnice:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleInputChange(e, index, 'ingredients')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`ingredientQuantity${index}`}>
                <Form.Label>Količina:</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleInputChange(e, index, 'ingredients')}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        <Button variant="dark" className="mb-3 mt-2" onClick={addIngredientRow}>
          Dodaj namirnicu
        </Button>

        <h3>Dodaj korake pripreme:</h3>
        {steps.map((step, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`stepDescription${index}`}>
                <Form.Label>Opis koraka:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={step.description}
                  onChange={(e) => handleInputChange(e, index, 'steps')}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`stepImage${index}`}>
                <Form.Label>Slika:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        <Button variant="dark" className="mb-3 mt-2" onClick={addStepRow}>
          Dodaj korak pripreme
        </Button>

        <Form.Group controlId="selectedCookbook">
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

        <Button variant="dark" className="mt-2" type="submit">
          Dodaj recept
        </Button>
      </Form>
    </Container>
  );
};

export default RecipeEditor;
