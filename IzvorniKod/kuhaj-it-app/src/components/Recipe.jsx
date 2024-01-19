import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';

const Recipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviewResponse, setReviewResponse] = useState({});
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {};

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/recipe/get/${recipeId}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      } else {
        console.error('Recept se ne može dohvatiti: ', response.statusText);
      }
    } catch (error) {
      console.error('Pogreška pri dohvaćanju recepta:', error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const fetchReviewResponses = async () => {
      // Logic to fetch review responses
      // For each review, fetch its response and update the state
      // This is a placeholder for the actual logic you would implement
    };

    if (recipe && recipe.reviews) {
      fetchReviewResponses();
    }
  }, [recipe]);

  const handleResponseSubmit = async (reviewId) => {
    try {
      const response = await fetch(`/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          message: responseMessage,
          username: currentUser.username || '',
        }),
      });
      if (response.ok) {
        const newResponse = await response.json();
        setReviewResponse(newResponse);
      }
    } catch (error) {
      console.error('Pogreška pri slanju odgovora:', error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const form = new FormData();
      form.append('recipeId', recipeId);
      form.append('message', reviewMessage);
      form.append('mark', parseInt(reviewRating, 10) || 0);
      form.append('username', currentUser.username || '');

      const response = await fetch(`/review`, {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        console.error('Response nije ispravno poslan', response.statusText);
      } else {
        fetchRecipe();
      }
    } catch (error) {
      console.error('Pogreška pri slanju recenzije:', error);
    }
  };

  const handleAddToTriedRecipes = async () => {
    try {
      const form = new FormData();
      form.append("recipeId", recipeId);
      console.log(currentUser.username);
      form.append("username", currentUser.username);
      form.append("date", selectedDate?.toISOString().slice(0, 10));
      const response = await fetch(`/recipes/addToTriedRecipes`, {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        console.error("Recept se ne može dodati: ", response.statusText);
      }
    } catch (error) {
      console.error('Pogreška pri dodavanju recepta u isprobane:', error);
    }
  };

  return (
    <div className='bg-light p-2 min-vh-100'>
      <Container className='border border-black p-3'>
      <h2>Recept</h2>
      {recipe ? (
        <>
          <p>Ime recepta: {recipe.name}</p>
          <p>Vlasnik recepta: {recipe.creator}</p>
          <p>Veličina porcije {recipe.portionSize}</p>
          <p>Vrijeme spremanja: {recipe.cookTime}</p>
          <p>Kategorija: {recipe.category}</p>

          <h3>Sastojci:</h3>
          <ul>
            {!recipe.ingredients || recipe.ingredients.length === 0 ? (
              <div>Nema sastojaka</div>
            ) : (
              <div>
                {recipe.ingredients.map((recipeIngredient, index) => (
                  <li key={index}>
                    <p>Ime: {recipeIngredient.ingredient.name}</p>
                    <p>Količina: {recipeIngredient.quantity} g</p>
                  </li>
                ))}
              </div>
            )}
          </ul>

          <h3>Koraci pripreme:</h3>
          <ul>
            {!recipe.stepOfMaking || recipe.stepOfMaking.length === 0 ? (
              <div>Nema koraka pripreme</div>
            ) : (
              <div>
                {recipe.stepOfMaking.map((stepOfMaking, index) => (
                  <li key={index}>
                    <p>Broj koraka: {stepOfMaking.stepNum}</p>
                    <p>Opis: {stepOfMaking.description}</p>
                    {stepOfMaking.image && (
                      <img
                        src={stepOfMaking.image}
                        alt={`Step ${stepOfMaking.stepNum} Image`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </li>
                ))}
              </div>
            )}
          </ul>

          <h3>Recenzije:</h3>
          <ListGroup className='m-2'>
            {!recipe.reviews || recipe.reviews.length === 0 ? (
              <div>Nema recenzija</div>
            ) : (
              <div>
                {recipe.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <p>Poruka: {review.message}</p>
                    <p>Ocjena: {review.mark}</p>
                    <p>Autor: {review.username || 'Anoniman'}</p>
                    {reviewResponse && (
                      <div>
                        <p>Odgovor: {reviewResponse.message}</p>
                        <p>Autor odgovora: {reviewResponse.username}</p>
                      </div>
                    )}
                    {!review.response && currentUser.username === recipe.creator && (
                      <div>
                        <Form.Control
                          as="textarea"
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          placeholder="Odgovori na recenziju..."
                        />
                        <Button variant="primary" onClick={() => handleResponseSubmit(review.id)}>
                          Pošalji odgovor
                        </Button>
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </div>
            )}
          </ListGroup>

          <div>
            <h3>Dodajte svoju recenziju:</h3>
            <Form.Control
              as="textarea"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Unesite svoju recenziju..."
            />
            <Form.Label className='m-2'>Ocjena:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <Button variant="dark" className="m-3" onClick={handleReviewSubmit}>
              Dodaj recenziju
            </Button>
          </div>

          <div>
            <h3>Dodajte recept u isprobane:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
            />
            <Button variant="dark" className="m-3" onClick={handleAddToTriedRecipes}>
              Dodaj u isprobane recepte.
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      </Container>
    </div>
  );
};

export default Recipe;
