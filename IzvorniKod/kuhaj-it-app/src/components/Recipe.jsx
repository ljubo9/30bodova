import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Recipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviewResponse, setReviewResponse] = useState({});
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));


  const fetchRecipe = async () => {
    try {
      //endpoint za dohvaćanje recepta po id-u
      const response = await fetch(`/recipe/get/${recipeId}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
        console.log(data);
      } 
      else {
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
      // slanje odgovora na recenziju, šalje se review.id, string odgovor i username

      const response = await fetch(`/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          message: responseMessage,
          username: currentUser.username,
        }),
      });
      if (response.ok) {
        const newResponse = await response.json();
        setReviewResponse(newResponse);
      }
      // Ovdje možete rukovati odgovorom, ako je potrebno
    } catch (error) {
      console.error('Pogreška pri slanju odgovora:', error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      // slanje recenzije, šalje se recipeId, message, mark, username
      const form = new FormData();
      form.append("recipeId", recipeId);
      form.append("message", reviewMessage);
      form.append("mark", reviewRating);
      form.append("username", currentUser.username);

      const response = await fetch(`/review`, {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        console.error("Response nije ispravno poslan", response.statusText);
      }
      else {
        fetchRecipe();
      }

      // Ovdje možete rukovati odgovorom, ako je potrebno
    } catch (error) {
      console.error('Pogreška pri slanju recenzije:', error);
    }
  };

  const handleAddToTriedRecipes = async () => {
    try {
      // slanje podataka za dodavanje u isprobane recepte
      const response = await fetch(`/recipes/addToTriedRecipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          username: currentUser.username,
          date: selectedDate.toISOString().slice(0, 10),  
        }),
      });


    } catch (error) {
      console.error('Pogreška pri dodavanju recepta u isprobane:', error);
    }
  };

  return (
    <div>
      <h2>Recept</h2>
      {recipe ? (
        <>
          {/* Prikaz informacija o samom receptu */}
          <p>Ime recepta: {recipe.name}</p>
          <p>Veličina porcije {recipe.portionSize}</p>
          <p>Vrijeme spremanja: {recipe.cookTime}</p>

          {/* Prikaz informacija o sastojcima */}
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
          <ul>
            {!recipe.reviews || recipe.reviews.length === 0 ? (
              <div>Nema recenzija</div>
            ) : (
              <div>
                {recipe && recipe.reviews && recipe.reviews.map((review) => {
                  // dohvaćanje odgovora iz baze
                  return (
                    <li key={review.id}>
                      <p>Poruka: {review.message}</p>
                      <p>Ocjena: {review.mark}</p>
                      <p>Autor: {review.username || 'Anoniman'}</p>
                      {/* ako odgovor postoji prikaži */}
                      {reviewResponse && (
                        <div>
                          <p>Odgovor: {reviewResponse.message}</p>
                          <p>Autor odgovora: {reviewResponse.username}</p>
                        </div>
                      )}
                      {/* ako je odgovor undefined i trenutno ulogirani korisnik je jednak vlasniku recepta */}
                      {!review.response &&
                        currentUser.username === recipe.username && (
                          <div>
                            <textarea
                              value={responseMessage}
                              onChange={(e) => setResponseMessage(e.target.value)}
                              placeholder="Odgovori na recenziju..."
                            />
                            <button onClick={() => handleResponseSubmit(review.id)}>
                              Pošalji odgovor
                            </button>
                          </div>
                        )}
                    </li>
                  );
                })}
              </div>
            )}
          </ul>
          {/* Dodavanje nove recenzije */}
          <div>
            <h3>Dodajte svoju recenziju:</h3>
            <textarea
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Unesite svoju recenziju..."
            />
            <label>
              Ocjena:
              <input
                type="number"
                min="1"
                max="5"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
              />
            </label>
            <button onClick={handleReviewSubmit}>Dodaj recenziju</button>
          </div>

          {/* Dodavanje u isprobane recepte */}
          <div>
            <h3>Dodajte recept u isprobane:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />
            <button onClick={handleAddToTriedRecipes}>Dodaj u isprobane recepte.</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipe;