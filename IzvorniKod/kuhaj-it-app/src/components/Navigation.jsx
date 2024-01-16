import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import RecipeAndCookbookEditor from './RecipeAndCookbookEditor'; 
function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    navigate('/');
  };

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">KuhajIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/culinary-enthusiasts">
                Kulinarski Entuzijasti
              </Nav.Link>
              <Nav.Link as={Link} to="/choose-recipe">
                Choose Recipe
              </Nav.Link>
              {currentUser && currentUser.role === 'nutritionist' && (
                <Nav.Link as={Link} to="/nutritionist">
                  Nutritionist
                </Nav.Link>
              )}
              {currentUser && currentUser.role === 'culinaryenthusiasts' && (
                <Nav.Link as={Link} to="/recipe-and-cookbook-editor">
                  Recipe and Cookbook Editor
                </Nav.Link>
              )}
              {currentUser ? (
                <>
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

      {/*prikaz RecipeAndCookbookEditor komponente ako je ulogirani korisnik entuzijast */}
      {currentUser && currentUser.role === 'ENTHUSIAST' && (
        <RecipeAndCookbookEditor />
      )}
    </div>
  );
}

export default Navigation;

