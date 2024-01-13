import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ChooseRecipe = () => {
  const [products, setProducts] = useState([]);

  const handleScanSuccess = (decodedText) => {
    // Add the scanned product to the products state
    setProducts([...products, decodedText]);
  };

  const handleScanFailure = (errorMessage) => {
    // Handle scan failure
    console.error(errorMessage);
  };

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
      {/* Add your logic for displaying and sorting recipes here */}
    </div>
  );
};

export default ChooseRecipe;