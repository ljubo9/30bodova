import React, { useState, useEffect } from 'react';

function CulinaryEnthusiast() {
  const [enthusiasts, setEnthusiasts] = useState([]);

  const fetchEnthusiasts = async () => {
    try {
      //neznam koji je endpoint
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
            <h3>{enthusiast.name}</h3>
            <p>{enthusiast.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CulinaryEnthusiast;
