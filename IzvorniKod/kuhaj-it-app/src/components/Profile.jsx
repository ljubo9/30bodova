import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = sessionStorage.getItem('currentUser');
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  {currentUser.role === 'enthusiast' && (
    <Link as={Link} to="/enthusiast/${username}">
      Moje kuharice i recepti
    </Link>
  )}

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // endpoint za dohvaćanje podataka o useru po username-u - treba vratit ono kaj se slalo za registraciju
        const profileResponse = await fetch(`/user/${username}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfileData(profileData);
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
    </div>
  );
};

export default Profile;
