import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProfileCulinaryEnthusiast = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [cookbooksData, setCookbooksData] = useState([]); // cookbooksData = sve kuharice od kul.entuzijasta
  const [recipesData, setRecipesData] = useState([]); // recipesData = svi recepti ku. entuzijasta

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
    <div>
      <h2>{profileData.firstName} {profileData.lastName}</h2>
      <p>Username: {profileData.username}</p>

      <h3>Cookbooks:</h3>
      <ul>
        {cookbooksData.map((cookbook) => (
          <li key={cookbook.id}>
            <Link to={`/cookbook/${cookbook.id}`}>{cookbook.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Recipes:</h3>
      <ul>
        {recipesData.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/get?id=${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCulinaryEnthusiast;
