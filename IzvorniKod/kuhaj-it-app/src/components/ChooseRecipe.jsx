import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ChooseRecipe = () => {
  const [products, setProducts] = useState([]);
  const [manualProduct, setManualProduct] = useState('');

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

  const displayAndSortRecipes = () => {
    // Add your logic for displaying and sorting recipes here
    // This function will be called whenever products or other relevant state changes
  };

  // Call displayAndSortRecipes whenever products or other relevant state changes
  React.useEffect(() => {
    displayAndSortRecipes();
  }, [products]);

  return (
    <div>
      <Html5QrcodeScanner
        id="reader"
        fps={10}
        qrbox={250}
        onScanSuccess={handleScanSuccess}
        onScanFailure={handleScanFailure}
      />
      
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
          placeholder="Unesite proizvod"
        />
        <button onClick={addManualProduct}>Dodaj ručno</button>
      </div>

      {/* Add your logic for displaying and sorting recipes here */}
    </div>
  );
};

export default ChooseRecipe;
