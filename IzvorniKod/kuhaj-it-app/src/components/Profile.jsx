import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = sessionStorage.getItem('currentUser');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch(`/user/${currentUser}`);
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
  }, [currentUser]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{profileData.firstName} {profileData.lastName}</h2>
      <p>Ime: {profileData.name} {profileData.surname}</p>
      <p>Korisničko ime: {profileData.username}</p>

      {currentUser.role === 'enthusiast' || currentUser.role === 'nutritionist' ? (
        <div>
          <img src={profileData.image} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          <p>Biografija: {profileData.biography}</p>
        </div>
      ) : null}

      {currentUser.role === 'enthusiast' ? (
          <Link as={Link} to={`/enthusiast/${currentUser}`}>
            Moje kuharice i recepti
          </Link>
        ) : null}

    </div>
  );
};

export default Profile;
