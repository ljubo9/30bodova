import React, { useState, useEffect } from 'react';

const Nutritionist = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [targetCalories, setTargetCalories] = useState(0);
  const [targetProtein, setTargetProtein] = useState(0);
  const [targetCarbs, setTargetCarbs] = useState(0);
  const [targetFat, setTargetFat] = useState(0);
  const [recommendedDiet, setRecommendedDiet] = useState([]);
  const [newProductInfo, setNewProductInfo] = useState({
    name: '',
    category: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    image: '',
    weight: '',
    labels: '',
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const fetchProducts = () => {
    // API endpoint to fetch products

    fetch('/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const addMissingInfo = (productId) => {
    // Find the product in the state based on productId
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        // Update the product with missing information
        return {
          ...product,
          calories: newProductInfo.calories,
          protein: newProductInfo.protein,
          carbs: newProductInfo.carbs,
          fat: newProductInfo.fat,
          image: newProductInfo.image,
          weight: newProductInfo.weight,
          labels: newProductInfo.labels.split(',').map(label => label.trim()),
        };
      }
      return product;
    });
  
    setProducts(updatedProducts);
    const formData = new FormData();
    formData.append('calories', newProductInfo.calories);
    formData.append('protein', newProductInfo.protein);
    formData.append('carbs', newProductInfo.carbs);
    formData.append('fat', newProductInfo.fat);
    formData.append('image', newProductInfo.image);
    formData.append('weight', newProductInfo.weight);
    formData.append('labels', newProductInfo.labels);
  
    fetch(`/products/${productId}`, {
      method: 'PUT', 
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log('Product updated successfully:', data))
      .catch(error => console.error('Error updating product:', error));
  };
  
  return (
    <div>
      <div>
        <button onClick={fetchProducts}>Fetch Products</button>
      </div>

      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category}
              <button onClick={() => addMissingInfo(product.id)}>Add Missing Info</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Nutritionist;
