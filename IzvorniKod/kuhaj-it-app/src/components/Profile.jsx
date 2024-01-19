import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

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
    <div className="d-flex justify-content-center align-items-center p-2">
    <Container className="mt-4 border border-black">
      <Row className="justify-content-center text-center">
        <Col className="m-2 p-2">
          <h2>{profileData.name} {profileData.surname}</h2>
          <p>Korisničko ime: {profileData.username}</p>

          {(currentUser.role === 'ENTHUSIAST' || currentUser.role === 'NUTRITIONIST') && (
            <div>
              <Image
                src={profileData.image.data}
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <p>Biografija: {profileData.biography}</p>
            </div>
          )}

          {currentUser.role === 'ENTHUSIAST' && (
            <Link as={Link} to={`/enthusiast/${profileData.username}`}>
              <Button variant="dark" className="mb-3">Moje kuharice i recepti</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Profile;
