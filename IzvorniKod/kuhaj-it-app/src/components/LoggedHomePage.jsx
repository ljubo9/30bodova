import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Col, Row } from 'react-bootstrap';
import cookingImage from '../assets/cooking.png'; 

function LoggedHomePage() {
  const { username } = useParams();
  const [recipeList, setRecipeList] = useState(null);

  useEffect(() => {
    const fetchRecipeList = async () => {
      try {
        //ruta za recepte koje je neki user konzumiro
        const response = await fetch('http://localhost:8080/recepies/user/${username}');
        if (response.ok) {
          const data = await response.json();
          setRecipeList(data);
        } else {
          console.error('Error fetching profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchRecipeList();
  }, [username]);

  if (!recipeList) {
    return <div>Loading...</div>;
  }
  
  return (
    <Container>
      <Row>
        {recipeList.map(recipe => (
          <Col key={recipe.id} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={cookingImage} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  <strong>Sastojci:</strong>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Card.Text>
                  <strong>Priprema:</strong>
                  <ol>
                    {recipe.steps_of_making.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LoggedHomePage;
