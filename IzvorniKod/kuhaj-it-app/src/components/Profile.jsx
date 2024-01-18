import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch(`/user/${currentUser.username}`);
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

  console.log(profileData)

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{profileData.firstName} {profileData.lastName}</h2>
      <p>Ime: {profileData.name} {profileData.surname}</p>
      <p>Korisničko ime: {profileData.username}</p>

      {currentUser.role === 'ENTHUSIAST' || currentUser.role === 'NUTRITIONIST' ? (
        <div>
          <img src={profileData.image} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          <p>Biografija: {profileData.biography}</p>
        </div>
      ) : null}

      {currentUser.role === 'ENTHUSIAST' ? (
          <Link as={Link} to={`/enthusiast/${profileData.username}`}>
            Moje kuharice i recepti
          </Link>
        ) : null}

    </div>
  );
};

export default Profile;
