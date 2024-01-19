import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

const ProfileCulinaryEnthusiast = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [cookbooksData, setCookbooksData] = useState([]); // cookbooksData = sve kuharice od kul.entuzijasta
  const [recipesData, setRecipesData] = useState([]); // recipesData = svi recepti ku. entuzijasta
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  const follow = async () => {
    const formData = new FormData();
    formData.append('enthusiast', username);
    formData.append('user', currentUser.username);

    try {
      {/* slanje cookbook.name i cookbook.category i creatora na endpoint */}
      const response = await fetch('/follow', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Followed successfully');
      } else {
        console.error('Error following');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // endpoint za dohvaćanje kul.entuzijasza po usernameu
        const profileResponse = await fetch(`/enthusiasts/${username}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfileData(profileData);
          // profileData je profil entuzijasta

          // dohvaćanje kuharica po cretor.username
          const cookbooksResponse = await fetch(`/cookbooks?creator=${username}`);
          if (cookbooksResponse.ok) {
            const cookbooksData = await cookbooksResponse.json();
            setCookbooksData(cookbooksData);
          } else {
            console.error('Error fetching cookbooks data:', cookbooksResponse.statusText);
          }

          // dohvaćanje recepata po creator.username
          const recipeResponse = await fetch(`/recipes?creator=${username}`);
          if (recipeResponse.ok) {
            const recipeData = await recipeResponse.json();
            setRecipesData(recipeData);
          } else {
            console.error('Error fetching recipe data:', recipeResponse.statusText);
          }
        } else {
          console.error('Error fetching profile data:', profileResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchProfileData();
  }, [username]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-secondary p-2 min-vh-100"> 
    <Container className="bg-light">
      <Row>
        <Col className="border border-black m-2 p-2">
          <h2>{profileData.name} {profileData.surname}</h2>
          <p>Korisničko ime: {profileData.username}</p>
          {isLoggedIn && (
             <Button variant="dark" onClick={follow}>
                  Zaprati
                </Button>
        )}
        </Col>
      </Row>

      <Row>
        <Col className="m-2">
          <h3>Kuharice:</h3>
          <ListGroup>
            {cookbooksData.map((cookbook) => (
              <ListGroup.Item key={cookbook.id}>
                <Link to={`/cookbook/${cookbook.id}`}>{cookbook.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col className="m-2">
          <h3>Recepti:</h3>
          <ListGroup>
            {recipesData.map((recipe) => (
              <ListGroup.Item key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

      </Row>
    </Container>
    </div>
    /*<div>
      <h2>{profileData.firstName} {profileData.lastName}</h2>
      <p>Korisničko ime: {profileData.username}</p>

      <h3>Kuharice:</h3>
      <ul>
        {cookbooksData.map((cookbook) => (
          <li key={cookbook.id}>
            <Link to={`/cookbook/${cookbook.id}`}>{cookbook.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Recepti:</h3>
      <ul>
        {recipesData.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
        </div>*/
  );
};

export default ProfileCulinaryEnthusiast;
