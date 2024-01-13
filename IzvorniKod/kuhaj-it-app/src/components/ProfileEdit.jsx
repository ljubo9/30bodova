import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    newUsername: '',
    newPassword: '',
    oldPassword: '', 
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
      const authResponse = await fetch('https://kuhajitbackend.onrender.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.newUsername,
          password: userData.oldPassword, 
        }),
      });
  
      if (!authResponse.ok) {
        console.error('Authentication failed. Please check your old password.');
        return;
      }
  
      const updateResponse = await fetch('https://kuhajitbackend.onrender.com/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newUsername: userData.newUsername,
          newPassword: userData.newPassword,
        }),
      });
  
      if (!updateResponse.ok) {
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
                name="newUsername"
                value={userData.newUsername}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={userData.oldPassword}
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

};


export default ProfileEdit;
