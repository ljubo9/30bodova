import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
    <div>
      <h2>Add Cookbook</h2>
      <Form onSubmit={handleCookbookSubmit}>
        <Form.Group controlId="cookbookName">
          <Form.Label>Cookbook Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cookbook name"
            value={cookbookName}
            onChange={(e) => setCookbookName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="cookbookCategory">
          <Form.Label>Cookbook Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cookbook category"
            value={cookbookCategory}
            onChange={(e) => setCookbookCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Cookbook
        </Button>
      </Form>
    </div>
  );
};

export default CookbookEditor;
