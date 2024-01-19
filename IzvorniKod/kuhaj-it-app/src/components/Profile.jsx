import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Profile = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setProfileData(currentUser)
    };

    fetchProfileData();
  }, []);

  console.log(profileData)

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="border border-dark mt-3 p-2">
      <Row className="mt-3">
        <Col>
          <h2>{profileData.name} {profileData.surname}</h2>
          <p>Korisničko ime: {profileData.username}</p>
        </Col>
      </Row>

      {(currentUser.role === 'ENTHUSIAST' || currentUser.role === 'NUTRITIONIST') && (
        <Row className="mt-3">
          <Col>
            <Image
              src={profileData.image}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <p>Biografija: {profileData.biography}</p>
          </Col>
        </Row>
      )}

      {currentUser.role === 'ENTHUSIAST' && (
        <Row className="mt-3">
          <Col>
            <Link to={`/enthusiast/${profileData.username}`}>
              Moje kuharice i recepti
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
