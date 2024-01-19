import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect(()=>{
      const user = sessionStorage.getItem('currentUser')
      setUser(user)
    },[])


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};