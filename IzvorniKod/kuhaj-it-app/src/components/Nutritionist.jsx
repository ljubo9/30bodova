import React, { useState, useEffect } from 'react';

const Nutritionist = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [targetCalories, setTargetCalories] = useState(0);
  const [targetProtein, setTargetProtein] = useState(0);
  const [targetCarbs, setTargetCarbs] = useState(0);
  const [targetFat, setTargetFat] = useState(0);
  const [recommendedDiet, setRecommendedDiet] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const addProduct = (name, category, calories, protein, carbs, fat) => {
    const newProduct = {
      name,
      category,
      calories,
      protein,
      carbs,
      fat,
    };
    setProducts([...products, newProduct]);
  };

  const categorizeProducts = () => {
    const categories = [...new Set(products.map((product) => product.category))];
    return categories;
  };

  const createDiet = () => {
    const possibleDiets = products.filter(
      (product) =>
        product.calories <= targetCalories &&
        product.protein >= targetProtein &&
        product.carbs >= targetCarbs &&
        product.fat <= targetFat
    );
    setRecommendedDiet(possibleDiets);
  };

  return (
    <div>

      {currentUser && currentUser.role === 'nutritionist' && (

        <div>
          <div>
            <h2>Add Product</h2>
            <button onClick={() => addProduct(/* pass product details */)}>Add Product</button>
          </div>

          <div>
            <h2>Set Targets</h2>

            <button onClick={createDiet}>Create Diet</button>
          </div>
        </div>
      )}

      <div>
        <h2>Categories</h2>
        <ul>
          {categorizeProducts().map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Recommended Diet</h2>
        <ul>
          {recommendedDiet.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nutritionist;
