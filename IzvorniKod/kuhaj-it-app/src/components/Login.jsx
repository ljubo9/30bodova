import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user.username);
         navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary bg-gradient" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="border border-dark p-4 bg-white" style={{ width: '300px' }}>
        <Form.Group className="mb-3" controlId="Username">
          <Form.Label className="d-flex justify-content-center align-items-center">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label className="d-flex justify-content-center align-items-center">Password</Form.Label>
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
    </div>
  );
}

export default Login;
