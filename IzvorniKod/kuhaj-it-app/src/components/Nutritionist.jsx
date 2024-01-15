import React, { useState, useEffect } from 'react';

const Nutritionist = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newProductInfo, setNewProductInfo] = useState({
    name: '',
    category: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    salt: 0,
    saturatedFat: 0,
    image: '',
    weight: '',
    labels: [],
  });
  const [dietLimits, setDietLimits] = useState({
    lowCalorie: 2000,
    lowFat: 40,
    lowCarb: 150,
    dietDescription: '',
  });

  const createDiet = () => {
    const newDiet = {
      lowCalorie: dietLimits.lowCalorie,
      lowFat: dietLimits.lowFat,
      lowCarb: dietLimits.lowCarb,
      description: dietLimits.dietDescription,
    };

    console.log('New Diet:', newDiet);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);

    fetch('/labels') //labele za kategoriziranje proizvoda
      .then(response => response.json())
      .then(data => setLabels(data))
      .catch(error => console.error('Error fetching labels:', error));
  }, []);

  const fetchProducts = () => {

    fetch('/products') //dohvat proizvoda
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const addProduct = () => {
    const formData = new FormData();
    formData.append('name', newProductInfo.name);
    formData.append('category', newProductInfo.category);
    formData.append('calories', newProductInfo.calories);
    formData.append('protein', newProductInfo.protein);
    formData.append('carbs', newProductInfo.carbs);
    formData.append('fat', newProductInfo.fat);
    formData.append('sugar', newProductInfo.sugar);
    formData.append('salt', newProductInfo.salt);
    formData.append('saturatedFat', newProductInfo.saturatedFat);
    formData.append('image', newProductInfo.image);
    formData.append('weight', newProductInfo.weight);
    formData.append('labels', newProductInfo.labels.join(','));

    newProductInfo.labels.forEach((label, index) => {
      formData.append(`labels[${index}]`, label);
    });

    fetch('/products', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added successfully:', data);
        fetchProducts(); 
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <Container>
      <div>
        <button onClick={fetchProducts}>Dohvati proizvode</button>
      </div>

      <div>
        <h2>Dodaj proizvod</h2>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="productName">
              <Form.Label>Ime proizvoda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi ime proizvoda"
                value={newProductInfo.name}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productCategory">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dodijeli kategoriju proizvodu"
                value={newProductInfo.category}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, category: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productCalories">
              <Form.Label>Energija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi energijsku vrijednost proizvoda (u kilokalorijama)"
                value={newProductInfo.calories}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, calories: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productProtein">
              <Form.Label>Proteini</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu proteina"
                value={newProductInfo.protein}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, protein: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productCarbs">
              <Form.Label>Ugljikohidrati</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu ugljikohidrata"
                value={newProductInfo.carbs}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, carbs: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productFat">
              <Form.Label>Mast</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu masti"
                value={newProductInfo.fat}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, fat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productSugar">
              <Form.Label>Šećer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu šećera"
                value={newProductInfo.sugar}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, sugar: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productSalt">
              <Form.Label>Sol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu soli"
                value={newProductInfo.salt}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, salt: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productSaturatedFat">
              <Form.Label>Zasićene masne kiseline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu zasićenih masnih kiselina"
                value={newProductInfo.saturatedFat}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, saturatedFat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productMass">
              <Form.Label>Masa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi količinu (u gramima) hrane"
                value={newProductInfo.weight}
                onChange={(e) => setNewProductInfo({ ...newProductInfo, weight: e.target.value })}
              />
            </Form.Group>

          <Form.Group controlId="productImage">
            <Form.Label>Slika proizvoda</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setNewProductInfo({ ...newProductInfo, image: e.target.files[0] })}
            />
          </Form.Group>

          <Form.Group controlId="productLabels">
            <Form.Label>Labele</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi labele za kategorizaciju (odovjene zarezom)"
              value={newProductInfo.labels.join(',')}
              onChange={(e) => setNewProductInfo({ ...newProductInfo, labels: e.target.value.split(',') })}
            />
          </Form.Group>

          </Form.Row>

          <Button variant="primary" type="button" onClick={addProduct}>
            Dodaj proizvod
          </Button>
        </Form>
      </div>

      <div>
        <h2>Proizvodi</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Dijete</h2>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="lowCalorie">
              <Form.Label>Limitirane kalorije</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi kalorije"
                value={dietLimits.lowCalorie}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCalorie: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowFat">
              <Form.Label>Limitirane masti</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi masti"
                value={dietLimits.lowFat}
                onChange={(e) => setDietLimits({ ...dietLimits, lowFat: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lowCarb">
              <Form.Label>Limitirani ugljikohidrati</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesi ugljikohidrate"
                value={dietLimits.lowCarb}
                onChange={(e) => setDietLimits({ ...dietLimits, lowCarb: e.target.value })}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="dietDescription">
            <Form.Label>Opis dijete</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Unesi opis dijete"
              value={dietLimits.dietDescription}
              onChange={(e) => setDietLimits({ ...dietLimits, dietDescription: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={createDiet}>
            Stvori dijetu
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Nutritionist;


