import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Register from './components/Register';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterButtonClick = () => {
    setShowRegister(true);
  };

  return (
    <div className="App">
      <Navigation onRegisterButtonClick={handleRegisterButtonClick} />
      {showRegister && <Register />}
    </div>
  );
}

export default App;
