import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoggedHomePage() {
  //const { username } = useParams();
  const username = sessionStorage.getItem('currentUser');
  const [recipeList, setRecipeList] = useState(null);
  const [dietInfo, setDiet] = useState(null);
  const [consumedRecipesStatistics, setConsumedRecipesStatistics] = useState(null);
  const [followedChefs, setFollowedChefs] = useState([]);
  const [latestChefCookbooks, setLatestChefCookbooks] = useState({});
  const [latestChefRecipes, setLatestChefRecipes] = useState({});
    

  useEffect(() => {
    const fetchRecipeList = async () => {
      try {
        //ruta za recepte koje je neki user konzumiro
        //svakom useru trebalo bi dodati listu recepata koje je konzumirao
        //al ja bi to dodala ko mapu di je ključ taj recept a vrijednost je lista datuma kad je sve taj recept konzumirao jer nam to treba za statistiku
        const response = await fetch(`https://kuhajitbackend.onrender.com/recipes/user/${username}`);
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
        //dijeta ima listu recepata koje smije konzumirati - msm da je tak lakse za filtiriranje prihvatljivosti recepata
        //i ima opis kratki(neki string) koji daje nutricionist i sam ime dijete - to je ono kaj se prikazuje
        //svaka dijeta bi jos trebala imat listu zabranjenih sastojaka
        //i trebala bi imati mapu gdje je ključ koji je neki sastojak, a vrijednost je maksimalna kolicina tog sastojka koju smije konzumirati
        //i ima dnevni limit
        const response = await fetch(`https://kuhajitbackend.onrender.com/diet/user/${username}`);
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
        //msm da bi ovo bilo najlakse za usera dodamo atribut followed_Enthusiasts koji je lista entuzijasta koje user prati
        const response = await fetch(`https://kuhajitbackend.onrender.com/followed-enthusiasts/${username}`);
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

    const fetchLatestChefData = async () => {
      try {
        //za svakog entuzijasta trebamo dohvatiti njegove najnovije 3 kuharice i najnovije 3 recepta
        const cookbooksResponse = await fetch('https://kuhajitbackend.onrender.com/latest-enthusiast-cookbooks');
        const recipesResponse = await fetch('https://kuhajitbackend.onrender.com/latest-enthusiast-recipes');
        
        if (cookbooksResponse.ok && recipesResponse.ok) {
          const cookbooksData = await cookbooksResponse.json();
          const recipesData = await recipesResponse.json();
          
          setLatestChefCookbooks(cookbooksData);
          setLatestChefRecipes(recipesData);
        } else {
          console.error('Error fetching latest chef data:', cookbooksResponse.statusText, recipesResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching latest chef data:', error.message);
      }
    };

    const fetchConsumedRecipesStatistics = async () => {
      try {
        //ruta za statistiku usera - vratiti npr. broj kalorija koje je user konzumiro svaki dan u zadnjih 7 dana
        const response = await fetch(`https://kuhajitbackend.onrender.com/statistic/user/${username}`);
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
    fetchLatestChefData();
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
          <p>{dietInfo.description}</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Nove kuharice i recepti</h2>
          {followedChefs.map((chef, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{chef.name}</Card.Title>
                <h5>Najnoviji radovi:</h5>
                <p>
                  {latestChefCookbooks[chef.id]?.map((latestCookbook, idx) => (
                    <Link key={idx} to={`/cookbook/${latestCookbook.id}`}>{latestCookbook.title}</Link>
                  ))}
                </p>
                <p>
                  {latestChefRecipes[chef.id]?.map((latestRecipe, idx) => (
                    <Link key={idx} to={`/recipe/${latestRecipe.id}`}>{latestRecipe.title}</Link>
                  ))}
                </p>
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