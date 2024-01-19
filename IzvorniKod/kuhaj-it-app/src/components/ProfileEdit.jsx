import React, { useState } from 'react';
import { Card, Container, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    newUsername: '',
    newPassword: '',
    oldPassword: '',
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeData = async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      const formData = new FormData();


       formData.append('newUsername', userData.newUsername);



      formData.append('newPassword', userData.newPassword);


      formData.append('oldPassword', userData.oldPassword);
      
      const updateResponse = await fetch(`/profile/${currentUser.username}`, {
        method: 'POST',
        body: formData,
      });

      if (!updateResponse.ok) {
        console.error('Failed to update user data');
        return;
      }

      if(formData.newUsername!=""){
        currentUser.username=formData.newUsername;
      }

      console.log('User data updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="bg-secondary">
      <Row className="d-flex justify-content-center align-items-center p-5" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <Card>
            <Form.Group controlId="newUsername" className="p-2 m-2">
              <Form.Label>Novo korisničko ime</Form.Label>
              <Form.Control
                type="text"
                name="newUsername"
                value={userData.newUsername}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="newPassword" className="p-2 m-2">
              <Form.Label>Nova lozinka</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="oldPassword" className="p-2 m-2">
              <Form.Label>Stara lozinka</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={userData.oldPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="dark" className="m-2" onClick={handleChangeData}>
              Promijeni podatke
            </Button>
          </Card>
        </div>
      </Row>
    </div>
  );
}

export default ProfileEdit;