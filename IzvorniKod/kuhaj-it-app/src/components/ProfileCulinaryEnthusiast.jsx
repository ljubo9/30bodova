import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileCulinaryEnthusiast = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // endpoint za ucitavanje konkretnog entuzijasta
        const response = await fetch(`https://kuhajitbackend.onrender.com/enthusiasts/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Error fetching profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
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
      {/* još cemo dodati informacija*/}
    </div>
  );
};

export default ProfileCulinaryEnthusiast;
