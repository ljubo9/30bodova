import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createAuthorizationFormObject = () => {
    return {
      username: username,
      password: password,
      name: firstName,
      surname: lastName,
      role: selectedRole.toUpperCase(),
      ...(selectedRole === 'nutritionist' || selectedRole === 'enthusiast'
        ? {
            email: email,
            biography: bio
          }
        : { email : null,
            biography: null,})
    };
  };


  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password) {
      setRegistrationStatus('require');
      console.error('Please fill in all required fields.');
      return;
    }
  
    if (['nutritionist', 'enthusiast'].includes(selectedRole)) {
      if (!email || !bio || !image) {
        setRegistrationStatus('require');
        console.error('Please fill in all required fields.');
        return;
      }
    }
  
    let registrationData = createAuthorizationFormObject();
  
    const createBodyObject = () => {
      return {
        model: JSON.stringify(registrationData),
        img: image,
      };
    };
  
    let body = createBodyObject();
    const formData = new FormData();
  
    for (const key in body) {
      formData.append(key, body[key]);
    }
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setRegistrationStatus('success');
        console.log('Registration successful!');
      } else if (response.status === 500) {
        setRegistrationStatus('username');
      } else {
        setRegistrationStatus('error');
        const errorMessage = await response.text();
        console.error('Registration failed. Server response:', errorMessage);
      }
    } catch (error) {
      setRegistrationStatus('error');
      console.error('Error sending request:', error.message);
    }
  };
  

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          {registrationStatus === 'success' && (
            <Alert variant="success">
              Registration successful! You can now sign in.
            </Alert>
          )}

          {registrationStatus === 'error' && (
            <Alert variant="danger">
              Registration failed. Please try again.
            </Alert>
          )}

          {registrationStatus === 'username' && (
            <Alert variant="danger">
              Username taken.
            </Alert>
          )}

          {registrationStatus === 'require' && (
            <Alert variant="danger">
              Please fill in all required fields.
            </Alert>
          )}



          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="client">Client</option>
                <option value="nutritionist">Nutritionist</option>
                <option value="enthusiast">Enthusiast</option>
              </Form.Select>
            </Form.Group>

            {['nutritionist', 'enthusiast'].includes(selectedRole) && (
              <>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                  <Form.Label>Biography</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your biography"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
