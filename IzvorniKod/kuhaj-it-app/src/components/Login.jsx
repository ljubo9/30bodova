import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary bg-gradient" style={{ height: '100vh' }}>
      <Form className="border border-dark p-4 bg-white" style={{ width: '300px' }}>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label className="d-flex justify-content-center align-items-center">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label className="d-flex justify-content-center align-items-center">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="dark" className="w-100" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
