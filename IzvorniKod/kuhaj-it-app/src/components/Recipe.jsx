import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        //endpoint za dohvaćanje recepta po id-u
        const response = await fetch(`/recipe/get/${recipeId}`);
        const data = await response.json();

        setRecipe(data);
      } catch (error) {
        console.error('Pogreška pri dohvaćanju recepta:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const fetchResponse = async (reviewId) => {
    try {
      //ednpoint za dohvavaćanje odgovora po review.id
      const response = await fetch(`/response?reviewId=${recipeId}`);
      const data = await response.json();

      return data[0];  //vraća jedan jedini response ili undefined
    } catch (error) {
      console.error('Pogreška pri dohvaćanju odgovora:', error);
    }
  };

  const handleResponseSubmit = async (reviewId) => {
    try {
      //slanje odgovora na recenziju, šalje se review.id, string odgovor i username
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

    

    } catch (error) {
      console.error('Pogreška pri slanju odgovora:', error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          message: reviewMessage,
          mark: reviewRating,
          username: currentUser.username,
        }),
      });


    } catch (error) {
      console.error('Pogreška pri slanju recenzije:', error);
    }
  };

  return (
    <div>
      <h2>Recept</h2>
      {recipe ? (
        <>
        {/*prikazivanje informacija o samom receptu */}
          <p>Recipe Name: {recipe.name}</p>
          <p>Portion size: {recipe.portionSize}</p>
          <p>Cook time: {recipe.cookTime}</p>


          {/*prikazivanje informacija o ingredients */}
          
          <h3>Ingredients:</h3>
          <ul>
            {!recipe.ingredients || recipe.ingredients.length === 0? (
              <div>Nema sastojaka</div>
            ) : (<div>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>Name: {ingredient.name}</p>
                <p>Quantity: {ingredient.quantity}</p>
              </li>
            ))}
            </div>
            )}
            
          </ul>

          <h3>Steps of making:</h3>
          <ul>
          {!recipe.stepOfMaking || recipe.stepOfMaking.length === 0? (
              <div>Nema koraka pripreme</div>
            ) : (<div>
            {recipe.stepsOfMaking.map((stepOfMaking, index) => (
              <li key={index}>
                <p>Step number: {stepOfMaking.stepNum}</p>
                <p>Description: {stepOfMaking.description}</p>
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

          {!recipe.reviews || recipe.reviews.length === 0? (
              <div>Nema recenzija</div>
            ) : (<div>
            {recipe.reviews.map(async (review) => {
              {/*dohvaćanje odgovora iz baze*/}
              const response = await fetchResponse(review.id);

              return (
                <li key={review.id}>
                  
                  <p>Poruka: {review.message}</p>
                  <p>Ocjena: {review.mark}</p>
                  <p>Autor: {review.creator.username || 'Anoniman'}</p>
                  {/*ako odgovor postoji prikaz*/}
                  {response && (
                    <div>
                      <p>Odgovor: {response.message}</p>
                      <p>Autor odgovora: {response.creator.username}</p>
                    </div>
                  )}
                  {/*ako je odgovor undefined i trenutno ulogirani korisnik je jednak vlasniku recepta*/}
                  {!response && currentUser.username === recipe.creator.username && (
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
          {/*dodavanje nove recentije  */}
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipe;
