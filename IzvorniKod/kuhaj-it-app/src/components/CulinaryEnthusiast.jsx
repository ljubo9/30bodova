import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CulinaryEnthusiast() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSubcategory, setFilterSubcategory] = useState('');
  const [filteredEnthusiasts, setFilteredEnthusiasts] = useState([]);  //filtirani entuzijasti po kategoriji ili searchu
  const [enthusiasts, setEnthusiasts] = useState([]);  //svi entuzijasti iz baze

  const fetchCreatorsByCategory = async (category) => {
    try {
      // Dohvaćanje svih kuharica iz baze čija je kategorija jednaka stisnutoj
      const cookbooksResponse = await fetch(`/cookbooks/category?category=${category}`);
      if (!cookbooksResponse.ok) {
        throw new Error(`Error fetching cookbooks: ${cookbooksResponse.statusText}`);

      }
      
      const cookbooksData = await cookbooksResponse.json();
      const cookbookAuthors = cookbooksData.map(cookbook => cookbook.creator);
  
      // Dohvaćanje svih recepata iz baze čija je kategorija jednaka stisnutoj
      const recipesResponse = await fetch(`/recipes/category?category=${category}`);
      if (!recipesResponse.ok) {
        throw new Error(`Error fetching recipes: ${recipesResponse.statusText}`);
      }
  
      const recipesData = await recipesResponse.json();
      const recipeAuthors = recipesData.map(recipe => recipe.creator);
  
      // Uklanjanje dupliciranih autora
      const allAuthors = [...new Set([...cookbookAuthors, ...recipeAuthors])];
  
      setFilteredEnthusiasts(allAuthors);
    } catch (error) {
      console.error('Error fetching creators:', error.message);
    }
  };
  

  const handleSubcategoryChange = (subcategory) => {
    setFilterSubcategory(subcategory);
    fetchCreatorsByCategory(subcategory);
  };

  useEffect(() => {
    const fetchAllEnthusiasts = async () => {
      try {
      //dohvacanje svih entuzijasta iz baze
        const response = await fetch('/enthusiasts');
        if (response.ok) {
          const data = await response.json();
          setEnthusiasts(data);
        } else {
          console.error('Error fetching enthusiasts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching enthusiasts:', error.message);
      }
    };

    fetchAllEnthusiasts();
  }, []);

  useEffect(() => {
    //svi entuzijasti se filtriraju 
    if (searchTerm == '') {
      console.log(1);
      setFilteredEnthusiasts(enthusiasts)
    }
    else {
      const filteredByUsername = enthusiasts.filter((enthusiast) =>
        enthusiast.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEnthusiasts(filteredByUsername);
    }
    console.log(filteredEnthusiasts);
  }, [searchTerm, enthusiasts]);

  useEffect(() => {
    fetchCreatorsByCategory(filterSubcategory);
  }, [filterSubcategory]);

  const menuOptions = [
    {
      label: 'Slatko',
      subOptions: ['Čokoladno', 'Voćno', 'Bezglutensko', 'Bezlaktozno', 'Dijabetes', 'Dijeta'],
    },
    {
      label: 'Slano',
      subOptions: ['Vegansko', 'Vegetarijansko', 'Bezglutensko', 'Obično'],
    },
  ];

  return (
    <>
      <div className="bg-secondary d-flex justify-content-center align-items-center mt-2">
        <h2 className="p-2 m-2 text-black bg-light">Profili kulinarskih entuzijasta</h2>
      </div>
      <div className="d-flex justify-content-start border border-dark bg-light m-2">
        <input
          type="text"
          placeholder="Pretraži po korisničkom imenu"
          className="m-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="m-3"
        >
          <option value="">Odaberi kategoriju</option>
          {menuOptions.map((option) => (
            <option key={option.label} value={option.label.toLowerCase()}>
              {option.label}
            </option>
          ))}
        </select>
        {filterCategory && (
          <select
            value={filterSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="m-3"
          >
            <option value="">Odaberi podkategoriju</option>
            {menuOptions
              .find((option) => option.label.toLowerCase() === filterCategory)
              ?.subOptions.map((subOption) => (
                <option key={subOption} value={subOption.toLowerCase()}>
                  {subOption}
                </option>
              ))}
          </select>
        )}
      </div>
      <ul className="bg-light">
        { filteredEnthusiasts.map((enthusiast) => (
          <li key={enthusiast.id}>
            <Link to={`/enthusiast/${enthusiast.username}`}>
              <h3>{enthusiast.username}</h3>
            </Link>
            <p>{enthusiast.biography}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CulinaryEnthusiast;
