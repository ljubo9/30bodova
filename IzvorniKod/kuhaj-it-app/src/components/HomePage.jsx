import React from 'react';
import { Card, Image } from 'react-bootstrap';
import cookingImage from '../assets/cooking.png'; 

function HomePage() {
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
