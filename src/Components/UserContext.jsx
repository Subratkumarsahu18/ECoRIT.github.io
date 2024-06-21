// UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context for user roles
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap the application
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('Admin'); // Default role can be 'Admin' or 'Dealer'

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
