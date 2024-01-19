import React, { useState, useEffect } from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
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
      <h5>Najnoviji radovi:</h5>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Object.keys(latestChefCookbooks).map((chefId, index) => (
        <div key={chefId} style={{ marginTop: index < Object.keys(latestChefCookbooks).length - 1 ? '20px' : 0 }}>
          <h6>Entuzijast: {chefId}</h6>
          <ul>
            {latestChefCookbooks[chefId].map((cookbook) => (
              <li key={cookbook.id}>
                <Link to={`/cookbook/${cookbook.id}`}>{cookbook.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>

      </div>

    </>
  );
}

export default HomePage;
