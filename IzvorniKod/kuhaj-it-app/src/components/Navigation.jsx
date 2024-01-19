import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';


function Navigation() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  console.log(currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    navigate('/');
  };

  console.log(currentUser)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      {isLoggedIn ? (
              <Navbar.Brand href="/home">KuhajIT</Navbar.Brand>
        ) : (<Navbar.Brand href="/">KuhajIT</Navbar.Brand>)}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/culinary-enthusiasts"> 
              Kulinarski Entuzijasti
            </Nav.Link>
            
            {currentUser && currentUser.role === 'NUTRITIONIST' && (
              <Nav.Link as={Link} to="/nutritionist">
                Nutricionist
              </Nav.Link>
            )} 
            
            {currentUser && currentUser.role === 'ENTHUSIAST' && (
              <Nav.Link as={Link} to="/cookbook-editor">
                Dodaj kuharicu
              </Nav.Link>
            )}
            {currentUser && currentUser.role === 'ENTHUSIAST' && (
              <Nav.Link as={Link} to="/recipe-editor">
                Dodaj recept
              </Nav.Link>
            )}
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/choose-recipe">
                  Odaberi recept
                </Nav.Link>
                <Nav.Link as={Link} to={`/user/${currentUser.username}`}>
                  {currentUser.username}
                </Nav.Link>
                <Button variant="dark" onClick={handleLogout}>
                  Logout
                </Button>
                <Nav.Link as={Link} to="/profile-edit">
                  Uređivanje profila
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;