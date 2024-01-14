import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ChooseRecipe = () => {
  const [products, setProducts] = useState([]);
  const [manualProduct, setManualProduct] = useState('');
  const [scanner, setScanner] = useState(null);
  const [manualProduct, setManualProduct] = useState('');
  const [scanner, setScanner] = useState(null);

  const handleScanSuccess = (decodedText) => {
    setProducts([...products, decodedText]);
  };

  const handleScanFailure = (errorMessage) => {
    console.error(errorMessage);
  };

  const handleManualProductChange = (e) => {
    setManualProduct(e.target.value);
  };

  const addManualProduct = () => {
    if (manualProduct.trim() !== '') {
      setProducts([...products, manualProduct.trim()]);
      setManualProduct('');
    }
  };

  const recipes = [
    { name: "Spaghetti Bolognese", requiredProducts: ["spaghetti", "tomato sauce", "ground beef"] },
    { name: "Vegetable Stir Fry", requiredProducts: ["broccoli", "carrot", "bell pepper", "soy sauce"] },
    { name: "Classic Pancakes", requiredProducts: ["flour", "egg", "milk", "butter"] },
    { name: "ulje", requiredProducts: ["ulje"] },
    // Add more recipes...
  ];

  const displayAndSortRecipes = () => {
    // Add your logic for displaying and sorting recipes here
  };

  useEffect(() => {
    if (!scanner) {
      const newScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
      newScanner.render(handleScanSuccess, handleScanFailure);
      setScanner(newScanner);
    }

    return () => {
      scanner?.clear();
    };
  }, [scanner]);

  useEffect(() => {
    // Match recipes with the scanned and manually added products
    const matchedRecipes = recipes.map(recipe => {
      const matchCount = recipe.requiredProducts.filter(product => products.includes(product)).length;
      return { ...recipe, matchCount };
    });

    // Sort recipes based on the number of matching products
    matchedRecipes.sort((a, b) => b.matchCount - a.matchCount);

    // Update state or directly render sorted recipes (depends on your component design)
    // setSortedRecipes(matchedRecipes); // If you have a state for sorted recipes
    return matchedRecipes; // If directly rendering in the component
  };

  useEffect(() => {
    if (!scanner) {
      const newScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
      newScanner.render(handleScanSuccess, handleScanFailure);
      setScanner(newScanner);
    }

    return () => {
      scanner?.clear();
    };
  }, [scanner]);

  useEffect(() => {
    displayAndSortRecipes();
  }, [products]);

  const sortedRecipes = displayAndSortRecipes();

  return (
    <div>
      <div id="reader" />
      
      <div id="reader" />
      
      {/* Display the scanned products */}
      {products.map((product, index) => (
        <p key={index}>{product}</p>
      ))}
      
      {/* Add manual input for products */}
      <div>
        <input
          type="text"
          value={manualProduct}
          onChange={handleManualProductChange}
          placeholder="Enter product"
        />
        <button onClick={addManualProduct}>Add Manually</button>
      </div>

      
      {/* Add manual input for products */}
      <div>
        <input
          type="text"
          value={manualProduct}
          onChange={handleManualProductChange}
          placeholder="Enter product"
        />
        <button onClick={addManualProduct}>Add Manually</button>
      </div>

      {/* Add your logic for displaying and sorting recipes here */}
      <div>
        {sortedRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.name}</h3>
            <p>Matching ingredients: {recipe.matchCount}/{recipe.requiredProducts.length}</p>
            {/* Additional details about the recipe can be displayed here */}
          </div>
        ))}
      </div>
      <div>
        {sortedRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.name}</h3>
            <p>Matching ingredients: {recipe.matchCount}/{recipe.requiredProducts.length}</p>
            {/* Additional details about the recipe can be displayed here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseRecipe;

