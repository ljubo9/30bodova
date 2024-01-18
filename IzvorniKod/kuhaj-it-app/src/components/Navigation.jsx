import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import CookbookEditor from './CookbookEditor'; 

function Navigation() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

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
        <Navbar.Brand href="/">KuhajIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/culinary-enthusiasts"> 
              Kulinarski Entuzijasti
            </Nav.Link>
            {currentUser && currentUser.role === 'NUTRITIONIST' && (
            <Nav.Link as={Link} to="/nutritionist">
                Nutritionist
            </Nav.Link>
            )}
            
            {currentUser && currentUser.role === 'ENTHUSIAST' && (
              <Nav.Link as={Nav.Link} to="/CookbookEditor">
                Add cookbook
              </Nav.Link>
            )}
            {currentUser && currentUser.role === 'ENTHUSIAST' && (
              <Nav.Link as={Nav.Link} to="/RecipeEditor">
                Add recipe
              </Nav.Link>
            )}
            {currentUser ? (
              <>
                <Nav.Link as={Link} to={`/user/${currentUser.username}`}>
                  {currentUser.username}
                </Nav.Link>
                <Nav.Link as={Link} to="/choose-recipe">
                  Choose Recipe
                </Nav.Link>
                <Nav.Link disabled>{currentUser.username}</Nav.Link>
                <Button variant="dark" onClick={handleLogout}>
                  Logout
                </Button>
                <Nav.Link as={Link} to="/profile-edit">
                  ProfileEdit
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
