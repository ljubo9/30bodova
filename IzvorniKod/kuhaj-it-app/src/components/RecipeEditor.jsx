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
        //dohvaćanje kuharica po id-u entuzijasta
        console.log(currentUser)
        const response = await fetch(`https://kuhajitbackend.onrender.com/cookbook/${currentUser.username}`);
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

        //svaka namirnica se pojedinačno šalje na back, šalje se recipe.id i sve informaicje o namirnici
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
            console.log('Podaci o namirnici uspješno poslani.');
          } else {
            console.error('Greška u zahtjevu za namirnicama');
          }
        }
        //svaki stepOfMaking se pojedinačno šalje...
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
            console.error('Greška u zahtjevu za koracima pripreme');
          }
        }
        //ako je uopće odabrana kuharica,na endpoint cookbook se šalje id recepta i id kuharice i onda se taj recept doda u recepte od kuharice
        if (selectedCookbook) {
          const cookbookResponse = await fetch('https://kuhajitbackend.onrender.com/cookbook', {
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

        {/* ... (similar structure for other form fields) */}

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

        {/* ... (similar structure for other form sections) */}

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
