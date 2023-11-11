import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [approved, setApproved] = useState(false);

  const handleRegister = async () => {
    const registrationData = {
      username,
      password,
      name: firstName,
      surname: lastName,
      role,
      email,
      biography: bio,
      photo_url: image, // Assuming you have a mechanism to handle file uploads
    };

    if (['nutritionist', 'enthusiast'].includes(role)) {
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (response.ok) {
          setApproved(true);
        } else {
          console.error('Registracija nije uspjela.');
        }
      } catch (error) {
        console.error('Došlo je do greške prilikom slanja zahtjeva:', error);
      }
    } else {
      // If a role other than 'nutritionist' or 'enthusiast' is selected
      setApproved(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite svoje ime"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite svoje prezime"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Odaberite ulogu</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="client">Klijent</option>
                <option value="enthusiast">Kulinarski entuzijast</option>
                <option value="nutritionist">Nutricionist</option>
              </Form.Control>
            </Form.Group>

            {['nutritionist', 'enthusiast'].includes(role) && (
              <>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Unesite svoj email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBio">
                  <Form.Label>Biografija</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Napišite nekoliko riječi o sebi"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Slika profila</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" onClick={handleRegister}>
              Registriraj se
            </Button>

            {approved && <p>Registracija je odobrena od strane administratora.</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
