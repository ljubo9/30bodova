import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CulinaryEnthusiast() {
  const [enthusiasts, setEnthusiasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(''); // Dodano stanje za praćenje odabrane kategorije

  const fetchEnthusiasts = async () => {
    try {
      // endpoint za dohvaćanje profila kulinarskih entuzijasta iz baze
      const response = await fetch('https://kuhajitbackend.onrender.com/enthusiasts');
      if (response.ok) {
        const data = await response.json();
        setEnthusiasts(data);
      } else {
        console.error('Greška prilikom dohvaćanja entuzijasta:', response.statusText);
      }
    } catch (error) {
      console.error('Greška prilikom dohvaćanja entuzijasta:', error.message);
    }
  };

  useEffect(() => {
    fetchEnthusiasts();
  }, []);

  // Funkcija za filtriranje entuzijasta na temelju odabrane kategorije i unesenog pojma u tražilicu
  const filteredEnthusiasts = enthusiasts.filter((enthusiast) => {
    const isCategoryMatch =
      !filterCategory || enthusiast.category.toLowerCase() === filterCategory.toLowerCase();

    const isSearchMatch = enthusiast.username.toLowerCase().includes(searchTerm.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  // Definiranje opcija izbornika
  const menuOptions = [
    { label: 'Slatko', subOptions: ['Čokoladno', 'Voćno', 'Bezglutensko', 'Bezlaktozno', 'Dijabetes', 'Dijeta'] },
    { label: 'Slano', subOptions: ['Vegansko', 'Vegetarijansko', 'Bezglutensko', 'Obično'] },
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
        {/* Izbornik za odabir kategorije */}
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
      </div>
      <ul className="bg-light">
        {filteredEnthusiasts.map((enthusiast) => (
          <li key={enthusiast.id}>
            <Link to={`/enthusiast/${enthusiast.username}`}>
              <h3>{enthusiast.name}</h3>
            </Link>
            <p>{enthusiast.biography}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CulinaryEnthusiast;

