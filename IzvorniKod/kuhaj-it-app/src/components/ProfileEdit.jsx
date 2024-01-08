import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function ProfileEdit() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://kuhajitbackend.onrender.com/profile', {
          method: 'GET',
        });

        if (!response.ok) {
          navigate.push('/home');
          return;
        }

        const userDataFromServer = await response.json();
        setUserData(userDataFromServer);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeData = async () => {
    try {
      const response = await fetch('https://kuhajitbackend.onrender.com/profile', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error('Failed to update user data');
        return;
      }

      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-left p-5" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <Card>
            <Form.Group controlId="newUsername">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="dark" onClick={handleChangeData}>
              Change data
            </Button>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default ProfileEdit;
