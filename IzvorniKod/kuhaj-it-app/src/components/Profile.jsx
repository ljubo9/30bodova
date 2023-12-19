import React from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

const userData = {
  firstName: 'tanja',
  lastName: 'savic',
  username: 'tanja123',
  password: 'password',
  email: 'email@gmail.com',
  selectedRole: 'enthusiast',
  biography: 'moja biografija još će biti burnija, tek je život počeo',
  image: '../assets/cooking.png',
};

function Profile() {
  return (
    <Container>
    <Row className="justify-content-left p-5" style={{ height: '100vh'}}>

      <div className="col-md-6">
      <Card>

        <Card.Header className="bg-dark text-light d-flex align-items-center justify-content-center"> 
            ime + prezime
        </Card.Header>
        
        <Card.Text className="bg-light border border-dark border-1 mt-2 ps-2">
            username
        </Card.Text>

        <Card.Text className="bg-light border border-dark border-1 ps-2">
            *********
        </Card.Text>

        {['nutritionist', 'enthusiast'].includes(userData.selectedRole) && (
            <>
            <Card.Text className="bg-light border border-dark border-1 ps-2">
                email
            </Card.Text>
            <Card.Text className="bg-light border border-dark border-1 ps-2">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Card.Text>
            </>
        )}
        
        <Button variant="dark">
        Change data
      </Button>
      </Card>    
      </div>
      {['nutritionist', 'enthusiast'].includes(userData.selectedRole) && (
        <div className="col-md 6">
            <div>slika</div>    
        </div>   
      )}
      
    </Row>
    </Container>
  );
};

export default Profile;
