import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const ChooseRecipe = () => {
  const [products, setProducts] = useState([]);
  const [scanner, setScanner] = useState(null);
  const [recipesFromDB, setRecipesFromDB] = useState([]);
  const [scannedProductURL, setScannedProductURL] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const categories = {
    Voće: ["Jabuka", "Banana", "Naranča"],
    Povrće: ["Krumpir", "Mrkva", "Brokula"],
    // Dodajte više kategorija i namirnica po potrebi
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recepti");
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
    if (!scanner) {
      const newScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );
      newScanner.render(
        (decodedText) => {
          const matchedRecipe = recipesFromDB.find(
            (recipe) => recipe.qrCodeURL === decodedText
          );
          if (matchedRecipe) {
            setScannedProductURL(matchedRecipe.qrCodeURL);
            setProducts((prevProducts) => [
              ...prevProducts,
              matchedRecipe.name,
            ]);
          } else {
            console.error("Nema podudaranja za skenirani QR kod:", decodedText);
          }
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
        products.includes(product)
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

  return (
    <div>
      <div id="reader" />
      {products.map((product, index) => (
        <p key={index}>{product}</p>
      ))}
      {scannedProductURL && (
        <p>
          URL skenirane namirnice:{" "}
          <a href={scannedProductURL} target="_blank" rel="noopener noreferrer">
            {scannedProductURL}
          </a>
        </p>
      )}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Odaberi kategoriju</option>
          {Object.keys(categories).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">Odaberi namirnicu</option>
          {selectedCategory &&
            categories[selectedCategory].map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
        </select>
        <button
          onClick={() => {
            if (selectedProduct) {
              setProducts([...products, selectedProduct]);
              setSelectedProduct("");
            }
          }}
        >
          Dodaj
        </button>
      </div>
      <div>
        {sortedRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.name}</h3>
            <p>
              Podudarni sastojci: {recipe.matchCount}/
              {recipe.requiredProducts.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseRecipe;
