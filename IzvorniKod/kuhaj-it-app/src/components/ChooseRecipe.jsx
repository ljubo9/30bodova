import React, { useState, useEffect, useMemo } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link } from 'react-router-dom';



const ChooseRecipe = () => {
  const [products, setProducts] = useState({});
  const [scanner, setScanner] = useState(null);
  const [recipesFromDB, setRecipesFromDB] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const incrementProductCount = (product) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [product]: (prevProducts[product] || 0) + 1
    }));
  };

  const decrementProductCount = (product) => {
    setProducts((prevProducts) => {
      const newProducts = { ...prevProducts };
      if (newProducts[product] > 1) {
        newProducts[product] -= 1;
      } else {
        delete newProducts[product];
      }
      return newProducts;
    });
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/ingredients/all'); 
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Greška pri dohvaćanju namirnica:', error);
      }
    };

    fetchIngredients();
  }, []);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes/all");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecipesFromDB(data);
        } else {
          console.error("Greška pri dohvaćanju recepata:", response.statusText);
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju recepata:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!scanner) {
      const newScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );
      newScanner.render(
        (decodedText) => {
          incrementProductCount(decodedText);
        },
        (errorMessage) => {
          console.error(errorMessage);
        }
      );
      setScanner(newScanner);
    }

    return () => scanner?.clear();
  }, [scanner]);

  const addProduct = (product) => {
    if (product) {
      incrementProductCount(product);
    }
  };

  const getMatchCount = (recipe) => {
    const productNames = Object.keys(products);
    return recipe.ingredients.filter(ingredient => productNames.includes(ingredient)).length;
  };
  
  const sortedRecipes = useMemo(() => {
    return [...recipesFromDB].sort((a, b) => getMatchCount(b) - getMatchCount(a));
  }, [recipesFromDB, products]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* First Row */}
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
        {/* Left Column: QR Scanner */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}}>
          <h3>Skeniraj namirnicu:</h3>
          <div id="reader" style={{ width: 'fit-content' }} />
        </div>

        {/* Right Column: Product Selection */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Product Selection and List */}
          <div>
            <h3>Odaberi namirnicu:</h3>
            {/* Select Product */}
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Odaberi namirnicu</option>
                {ingredients.map((ingredient, index) => (
                 <option key={index} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
            </select>
            <button onClick={() => addProduct(selectedProduct)}>Dodaj</button>


          </div>

          {/* List of Products */}
          <div>
            {Object.entries(products).map(([product, count], index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: '10px' }}>
                {/* Column for Product Name */}
                <span style={{ marginRight: '20px', width: '150px' }}>{product}:</span>

                {/* Row for +, Count and - Buttons */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => decrementProductCount(product)} style={{ marginRight: '5px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                    </svg>
                  </button>
                  <span style={{ marginRight: '5px' }}>{count}</span>
                  <button onClick={() => incrementProductCount(product)} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      {/* Second Row: Recipe Cards */}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {sortedRecipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px' }}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            {/* Možete dodati više detalja o receptu ovdje */}
          </div>
        ))}
      </div>
    </div>
  );  
};

export default ChooseRecipe;