import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import cookingImage from '../assets/cooking.png'; 

function HomePage() {
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
    <>
      <div
        style={{
          height: '100vh',
          backgroundImage: `url(${cookingImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
        }}
      >
        <div className="d-flex justify-content-center align-items-center position-relative" style={{ height: '100vh' }}>
          <Card className="bg-warning bg-gradient p-5">
            <Card.Title>
              <h1>Dobrodošli u KuhajIT!</h1>
            </Card.Title>
            <Card.Text>
              <h5>Istražite kreativne recepte, dijete i započnite novo kulinarsko iskustvo!</h5>
            </Card.Text>
          </Card>
        </div>
      </div>
    </>
  );
}

export default HomePage;
