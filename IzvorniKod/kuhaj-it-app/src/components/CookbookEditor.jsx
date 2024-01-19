import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const CookbookEditor = () => {
  const [cookbookName, setCookbookName] = useState('');
  const [cookbookCategory, setCookbookCategory] = useState('');

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  const handleCookbookSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cookbookName', cookbookName);
    formData.append('cookbookCategory', cookbookCategory);
    formData.append('username', currentUser.username);

    try {
      {/* slanje cookbook.name i cookbook.category i creatora na endpoint */}
      const response = await fetch('/cookbooks', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Cookbook added successfully');
      } else {
        console.error('Error adding cookbook');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
      <Container className="mt-4 border border-black p-2">
      <h2>Dodaj kuharicu</h2>
      <Form onSubmit={handleCookbookSubmit}>
        <Form.Group controlId="cookbookName">
          <Form.Label className='m-2'>Ime kuharice</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi željeno ime kuharice"
            value={cookbookName}
            onChange={(e) => setCookbookName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="cookbookCategory">
          <Form.Label className="m-2">Kategorija kuharice</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kategoriziraj kuharicu"
            value={cookbookCategory}
            onChange={(e) => setCookbookCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" className="m-4" type="submit">
          Dodaj kuharicu
        </Button>
      </Form>
    </Container>
  );
};

export default CookbookEditor;
