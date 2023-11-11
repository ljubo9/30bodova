import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = {
      email: email,
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

    
      console.log('Server response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary bg-gradient" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="border border-dark p-4 bg-white" style={{ width: '300px' }}>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label className="d-flex justify-content-center align-items-center">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
