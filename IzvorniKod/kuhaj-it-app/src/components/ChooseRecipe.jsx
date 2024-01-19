import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from "react-bootstrap";



const ChooseRecipe = () => {
  const [recipesFromDB, setRecipesFromDB] = useState([]);
  

  const [products, setProducts] = useState({});
  const [scanner, setScanner] = useState(null);
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
        const response = await fetch('/ingredients/all'); // Pretpostavka URL-a
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
          console.log(data);
        } else {
          console.error("Greška pri dohvaćanju recepata:", response.statusText);
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju recepata:", error.message);
      }
    };
    console.log(1);
    fetchRecipes();
    console.log(recipesFromDB);
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



  // const displayAndSortRecipes = () => {
  //   const matchedRecipes = recipesFromDB.map((recipe) => {
  //     const matchCount = recipe.ingredients.filter((product) => 
  //       products.hasOwnProperty(product) && products[product] > 0
  //     ).length;
  //     return { ...recipe, matchCount };
  //   });
  
  //   matchedRecipes.sort((a, b) => b.matchCount - a.matchCount);
  //   return matchedRecipes;
  // };

  // useEffect(() => {
  //   displayAndSortRecipes();
  // }, [products, recipesFromDB]);
  

  // const sortedRecipes = displayAndSortRecipes();

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

   const [recepti, setRecepti] = useState([]);

  useEffect(() => {
    if (recipesFromDB.length > 0) {
      setRecepti(recipesFromDB);
    }
  }, [recipesFromDB]);

  useEffect(() => {
    setRecepti(
      recepti.filter((recept) => {
        recept.ingredients.forEach((ingredient) => {
          if (products[ingredient.ingredient.name] > 0) {
            return true;
          }
          // if (Object.keys(products).includes(ingredient.ingredient.name)) {
          //   return true;
          // }
        });
      })
    )
  }, [products]);


  return (
    <div className="bg-secondary p-2 min-vh-100"> 
    <Container className="mt-4 bg-light">
      {/* First Row */}
      <Row className="mb-4 mt-3 p-3">
        {/* Left Column: QR Scanner */}
        <Col md={6}>
          <div className="bg-white p-3 rounded text-center">
            <h3>Skeniraj namirnicu:</h3>
            <div id="reader" className="w-content" />
          </div>
        </Col>

        {/* Right Column: Product Selection */}
        <Col md={6}>
          <div className="bg-white p-3 rounded text-center">
            {/* Product Selection and List */}
            <div>
              <h3>Odaberi namirnicu:</h3>
              {/* Select Product */}
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Odaberi namirnicu</option>
                  {ingredients.map((ingredient, index) => (
                    <option key={index} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button onClick={() => addProduct(selectedProduct)} className="mt-3" variant="dark">Dodaj</Button>
            </div>

            {/* List of Products */}
            <div>
              {Object.entries(products).map(([product, count], index) => (
                <div key={index} className="d-flex align-items-center justify-content-start m-2">
                  {/* Column for Product Name */}
                  <span className="mr-3" style={{ width: '150px' }}>{product}:</span>

                  {/* Row for +, Count and - Buttons */}
                  <div className="d-flex align-items-center">
                    <Button onClick={() => decrementProductCount(product)} className="mr-2" variant="link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                      </svg>
                    </Button>
                    <span className="mr-2">{count}</span>
                    <Button onClick={() => incrementProductCount(product)} variant="link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Col>
      </Row>

      {/* Second Row: Recipe Cards */}
      <Row>
        {recepti && typeof recepti !== undefined && recepti.length > 0 && recepti.map((recipe, index) => (
          <Col md={4} key={index}>
            <div className="bg-white p-3 rounded mb-4">
              <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark">
                <h3>{recipe.name}</h3>
              </Link>
              <p>Podudarni sastojci: {recipe.matchCount}/{recipe.ingredients?.length}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default ChooseRecipe;
