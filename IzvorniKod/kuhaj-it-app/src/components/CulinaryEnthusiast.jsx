import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CulinaryEnthusiast() {
  const [enthusiasts, setEnthusiasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEnthusiasts = async () => {
    try {
      // endpoint za dohvaćanje profila kulinarskih entuzijasta iz baze
      const response = await fetch('https://kuhajitbackend.onrender.com/enthusiasts');
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

  useEffect(() => {
    fetchEnthusiasts();
  }, []);

  // Funkcija za filtriranje entuzijasta na temelju unesenog pojma u tražilicu
  const filteredEnthusiasts = enthusiasts.filter((enthusiast) =>
    enthusiast.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="bg-secondary d-flex justify-content-center align-items-center mt-2">
      <h2 className="p-2 m-2 text-black bg-light">Profili kulinarskih entuzijasta</h2>
    </div>
    <div className="d-flex justify-content-start border border-dark bg-light m-2">
      <input
        type="text"
        placeholder="Pretraži po username-u"
        className="m-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
