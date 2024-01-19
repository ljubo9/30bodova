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
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    const isValid = /^(?=.*[A-Z]).{8,}$/.test(newPassword);
    
    console.log(isValid);

    setPassword(newPassword);
    setIsValidPassword(isValid);
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
      }
      else if(response.status === 500) {
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
    <Container className="bg-secondary bg-gradient" fluid>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh'}}>
        <Col xs={12} md={6}>
          {isValidPassword === false && (
            <Alert variant="danger" className="mb-3">
              Odaberi sigurniju lozinku! Koristi barem 8 znakova i jedno veliko slovo.
            </Alert>
          )}

          {registrationStatus === 'success' && (
            <Alert variant="success">
              Uspješna registracija, možete se logirati!
            </Alert>
          )}

          {registrationStatus === 'error' && (
            <Alert variant="danger">
              Registracija neuspješna. Molimo pokušajte ponovo!
            </Alert>
          )}

          {registrationStatus === 'username' && (
            <Alert variant="danger">
              Neispravni parametri.
            </Alert>
          )}

          {registrationStatus === 'require' && (
            <Alert variant="danger">
              Popunite sva polja!
            </Alert>
          )}

          <Form className="border border-dark p-4 bg-white">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ime"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Prezime"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Odaberi korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Odaberi sigurnu lozinku"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Uloga</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="client">Klijent</option>
                <option value="nutritionist">Nutricionist</option>
                <option value="enthusiast">Entuzijast</option>
              </Form.Select>
            </Form.Group>

            {['nutritionist', 'enthusiast'].includes(selectedRole) && (
              <>
                  <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Upiši svoj mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bio">
                  <Form.Label>Biografija</Form.Label>
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
                  <Form.Label>Slika</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button variant="dark" className="w-100" onClick={handleRegister} disabled={!isValidPassword}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
