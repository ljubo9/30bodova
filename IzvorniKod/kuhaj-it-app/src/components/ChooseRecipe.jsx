import React, { useState, useEffect } from "react";
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
      [product]: prevProducts[product] + 1
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
        const response = await fetch('https://kuhajitbackend.onrender.com/ingredients'); // Pretpostavka URL-a
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
        const response = await fetch("https://kuhajitbackend.onrender.com/recipes");
        if (response.ok) {
          const data = await response.json();
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
    let newScanner;
    if (!scanner) {
      newScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250},
        false
      );
      newScanner.render(
        (decodedText) => {
          setProducts((prevProducts) => {
            // Ažurirajte brojač za skeniranu namirnicu
            const newProducts = { ...prevProducts };
            if (newProducts[decodedText]) {
              newProducts[decodedText] += 1;
            } else {
              newProducts[decodedText] = 1;
            }
            return newProducts;
          });
        },
        (errorMessage) => {
          console.error(errorMessage);
        }
      );
      setScanner(newScanner);
    }

    return () => scanner?.clear();
  }, [scanner]);


  const displayAndSortRecipes = () => {
    const matchedRecipes = recipesFromDB.map((recipe) => {
      const matchCount = recipe.requiredProducts.filter((product) => 
        products.hasOwnProperty(product) && products[product] > 0
      ).length;
      return { ...recipe, matchCount };
    });
  
    matchedRecipes.sort((a, b) => b.matchCount - a.matchCount);
    return matchedRecipes;
  };

  useEffect(() => {
    displayAndSortRecipes();
  }, [products, recipesFromDB]);

  const sortedRecipes = displayAndSortRecipes();

  const addProduct = (product) => {
    if (product) {
      setProducts((prevProducts) => {
        const newProducts = { ...prevProducts };
        if (newProducts[product]) {
          newProducts[product] += 1;
        } else {
          newProducts[product] = 1;
        }
        return newProducts;
      });
    }
  };

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
                  <button onClick={() => decrementProductCount(product)} style={{ marginRight: '5px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}><i class="bi bi-dash-circle-fill"></i></button>
                  <span style={{ marginRight: '5px' }}>{count}</span>
                  <button onClick={() => incrementProductCount(product)} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }}><i class="bi bi-plus-circle-fill"></i></button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Second Row: Recipe Cards */}
      <div>
        {sortedRecipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.name}</h3>
            </Link>
            <p>Podudarni sastojci: {recipe.matchCount}/{recipe.requiredProducts.length}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default ChooseRecipe;