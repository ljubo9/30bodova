import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

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
      const response = await fetch('https://kuhajitbackend.onrender.com/cookbook', {
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
    <div>
      <h2 className="m-3">Dodaj kuharicu</h2>
      <Form onSubmit={handleCookbookSubmit}>
        <Form.Group as={Col} controlId="cookbookName" className="m-2">
          <Form.Label className="m-2">Ime kuharice</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi željeno ime kuharice"
            value={cookbookName}
            onChange={(e) => setCookbookName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="cookbookCategory" className="m-2">
          <Form.Label className="m-2">Kategorija kuharice</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kategoriziraj kuharicu"
            value={cookbookCategory}
            onChange={(e) => setCookbookCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" className="m-3" type="submit">
          Dodaj kuharicu
        </Button>
      </Form>
    </div>
  );
};

export default CookbookEditor;
