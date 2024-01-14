import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Col, Row } from 'react-bootstrap';

function LoggedHomePage() {
  const { username } = useParams();
  const [recipeList, setRecipeList] = useState(null);
  const [dietInfo, setDiet] = useState(null);
  const [followedChefs, setFollowedChefs] = useState(null);
  const [consumedRecipesStatistics, setConsumedRecipesStatistics] = useState(null);

  useEffect(() => {
    const fetchRecipeList = async () => {
      try {
        //ruta za recepte koje je neki user konzumiro
        //svakom useru trebalo bi dodati listu recepata koje je konzumirao
        //al ja bi to dodala ko mapu di je ključ taj recept a vrijednost je lista datuma kad je sve taj recept konzumirao jer nam to treba za statistiku
        const response = await fetch('/recipes/user/${username}');
        if (response.ok) {
          const data = await response.json();
          setRecipeList(data);
        } else {
          console.error('Error fetching recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    const fetchDietInfo = async () => {
      try {
        //ruta za dijetu koja je dodijeljena useru - trebamo napravit entitet za dijetu, user ima jednu dijetu
        //dijeta ima listu recepata koje smije konzumirati - msm da je tak lakse
        const response = await fetch('/diet/user/${username}');
        if (response.ok) {
          const data = await response.json();
          setDiet(data);
        } else {
          console.error('Error fetching diet:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching diet:', error.message);
      }
    };

    const fetchFollowedChefs = async () => {
      try {
        //ruta za listu entuzijasta koje nas user prati, msm da to samo mozemo dodat listu ko atribut usera
        const response = await fetch('/followed/user/${username}');
        if (response.ok) {
          const data = await response.json();
          setFollowedChefs(data);
        } else {
          console.error('Error fetching followed chefs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching followed chefs:', error.message);
      }
    };

    const fetchConsumedRecipesStatistics = async () => {
      try {
        //ruta za statistiku usera - pogledat u zadatku kaj tocno
        const response = await fetch('/statistic/user/${username}');
        if (response.ok) {
          const data = await response.json();
          setConsumedRecipesStatistics(data);
        } else {
          console.error('Error fetching consumed recipes statistics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching consumed recipes statistics:', error.message);
      }
    };

    fetchRecipeList();
    fetchDietInfo();
    fetchFollowedChefs();
    fetchConsumedRecipesStatistics();
  }, [username]);

  if (!recipeList || !dietInfo || !followedChefs || !consumedRecipesStatistics) {
    return <div>Loading...</div>;
  }
  
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Isprobani recepti</h2>
          {recipeList.map(recipe => (
          <Col key={recipe.id} md={4}>
            <Card className="mb-4">
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
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Dijeta</h2>
          <p>{dietInfo}</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Nove kuharice</h2>
          {followedChefs.map((chef, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{chef.name}</Card.Title>
                {/* Dodajte ostale informacije o kuharici koje želite prikazati */}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Statistika konzumiranih nutritivnih vrijednosti</h2>
          {/* Dodajte prikaz statistike konzumiranih nutritivnih vrijednosti */}
          <p>{consumedRecipesStatistics}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoggedHomePage;