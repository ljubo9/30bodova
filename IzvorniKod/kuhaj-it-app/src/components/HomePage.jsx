import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookingImage from '../assets/cooking.png'; 

function HomePage() {
  const [latestChefCookbooks, setLatestChefCookbooks] = useState({});

  useEffect(() => {
    const fetchLatestChefData = async () => {
      try {
        //za svakog entuzijasta trebamo dohvatiti njegove najnovije 3 kuharice
        const cookbooksResponse = await fetch('/latest-enthusiast-cookbooks');
        
        if (cookbooksResponse.ok) {
          const cookbooksData = await cookbooksResponse.json();
          setLatestChefCookbooks(cookbooksData);
        } else {
          console.error('Error fetching latest chef data:', cookbooksResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching latest chef data:', error.message);
      }
    };
    fetchLatestChefData();
    //console.log(latestChefCookbooks["marko19"])
  });

  return (
      <>
      <Container fluid>
        <div
          style={{
            height: '100vh',
            backgroundImage: `url(${cookingImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Card className="bg-warning bg-gradient p-5 text-center text-black">
            <Card.Title>
              <h1>Dobrodošli u KuhajIT!</h1>
            </Card.Title>
            <Card.Text>
              <h5>Istražite kreativne recepte, dijete i započnite novo kulinarsko iskustvo!</h5>
            </Card.Text>
          </Card>
        </div>
      </Container>
      
      <Container className="mt-3 mb-3 border border-black">
        <h5 className="mt-2">Najnoviji radovi:</h5>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Object.keys(latestChefCookbooks).map((chefId, index) => (
            <div key={chefId} style={{ marginTop: index < Object.keys(latestChefCookbooks).length - 1 ? '20px' : 0 }}>
              <h6>Entuzijast: {chefId}</h6>
              <ListGroup className="m-2 p-2">
                {latestChefCookbooks[chefId].map((cookbook) => (
                  <ListGroup.Item key={cookbook.id}>
                    <Link to={`/cookbook/${cookbook.id}`}>{cookbook.name}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default HomePage;
