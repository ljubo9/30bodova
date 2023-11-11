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

  //kreiranje objekta Client 
  const createClientObject = () => {
    return {
      username,
      password,
      name: firstName,
      surname: lastName,
    };
  };

  //kreiranje objekta ako je odabran nutricionist ili kulinarski enutizijast za autorizaciju
  const createAuthorizationFormObject = () => {
    return {
      username,
      password,
      name: firstName,
      surname: lastName,
      role: selectedRole,
      email,
      biography: bio,
      photo_url: image, 
    };
  };

  const handleRegister = async () => {
    let registrationData;

    if (selectedRole === 'client') {
      registrationData = createClientObject();
    } else {
      registrationData = createAuthorizationFormObject();
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setRegistrationStatus('success');
        console.log('Registracija uspješna!');
     
      } else {
        setRegistrationStatus('error');
        console.error('Registracija nije uspjela.');
     
      }
    } catch (error) {
      setRegistrationStatus('error');
      console.error('Došlo je do greške prilikom slanja zahtjeva:', error);
    }
  };


  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          {registrationStatus === 'success' && (
            <Alert variant="success">
              Registracija uspješna! Sada se možete prijaviti.
            </Alert>
          )}

          {registrationStatus === 'error' && (
            <Alert variant="danger">
              Registracija nije uspjela. Molimo pokušajte ponovno.
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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