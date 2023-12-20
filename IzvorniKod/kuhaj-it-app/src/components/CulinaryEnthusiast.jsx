import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function CulinaryEnthusiast() {
//enthusiasts=svi kulinarski entuzijasti iz baze
  const [enthusiasts, setEnthusiasts] = useState([]);

  const fetchEnthusiasts = async () => {
    try {
      //endpoint fali
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

// vraćaju se svi profili kulinarskih entuzijasta
  return (
    <div>
        <h2>Profili kulinarskih entuzijasta</h2>
        <ul>
            {enthusiasts.map(enthusiast => (
              <li key={enthusiast.id}>
                <Link to={`/enthusiast/${enthusiast.username}`}>
                  <h3>{enthusiast.name}</h3>
                </Link>
                <p>{enthusiast.biography}</p>
              </li>
            ))}
        </ul>
    </div>
  );
}

export default CulinaryEnthusiast;
