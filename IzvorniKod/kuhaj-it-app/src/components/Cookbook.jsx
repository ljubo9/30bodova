import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Cookbook = () => {
  const { culinaryId } = useParams();
  const [cookbookData, setCookbookData] = useState(null);

  useEffect(() => {
    const fetchCookbookData = async () => {
      try {
        const response = await fetch(`/cookbook/get?id=${culinaryId}`);
        
        if (response.ok) {
          const data = await response.json();
          setCookbookData(data);
        } else {
          console.error('Error fetching cookbook data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cookbook data:', error.message);
      }
    };

    fetchCookbookData();
  }, [culinaryId]);

  if (!cookbookData) {
    return <p>Loading...</p>;
  }

  const { name, category, creatorid, recipes } = cookbookData;
  console.log(cookbookData)

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>{name}</h2>
          <p>
            <strong>Kreator:</strong> {creatorid}
          </p>
          <p>
            <strong>Kategorija:</strong> {category}
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Recepti u kuharici</h3>
          {!recipes || recipes.length === 0? (
              <div>Nema recepata</div>
          ) : (
          <div>
          {recipes.map((recipe, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>
                  <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </Card.Title>
                {/* Dodajte ostale informacije o receptu koje želite prikazati */}
              </Card.Body>
            </Card>
          ))}
          </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cookbook;
