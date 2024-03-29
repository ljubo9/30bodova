import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigate('/home');
      }
    };

    checkIfLoggedIn();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createLoginObject = () => {
      return {
        username: username,
        password: password,
      };
    };

    let loginData = createLoginObject();
    const formData = new FormData();

    for (const key in loginData) {
      formData.append(key, loginData[key]);
    }

    try {
      const response = await fetch('https://kuhajitbackend.onrender.com/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // provjera jel aktiviran korisnik
        const activationStatusResponse = await fetch(`https://kuhajitbackend.onrender.com/user/activation/${username}`);
        if (activationStatusResponse.ok) {
          const responseData = await response.json();
          const activationStatusData = await activationStatusResponse.text();
          if (activationStatusData === 'activated') {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify(responseData));
            //moramo dohvatiti ulogu iz baze da stavimo pod currentUser.role
            //endpoint za dohvaćanje podataka o ulogiranom korisniku iz baze
            navigate('/home');
           } 
        }          
      } else {
        setLoginStatus('error');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Container className="bg-secondary bg-gradient" fluid>
        {/* umjesto style={{ height: '100vh' }} može i className="h-screen" */}
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}> 
        <Col xs={12} sm={8} md={6} lg={4}>
          {loginStatus === 'error' && (
            <Alert variant="danger" className="mb-4">
              Krivi podaci. Probajte ponovo!
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="border border-dark p-4 bg-white">
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upišite svoje korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

