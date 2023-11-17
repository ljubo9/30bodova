import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';


const checkIfLoggedIn = () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    navigate('/');
  }
};

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

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
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {

        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', username);
        navigate('/');
        
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
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={12} sm={8} md={6} lg={4}>
          {loginStatus === 'error' && (
            <Alert variant="danger" className="mb-4">
              Wrong credentials. Please try again.
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="border border-dark p-4 bg-white">
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
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

