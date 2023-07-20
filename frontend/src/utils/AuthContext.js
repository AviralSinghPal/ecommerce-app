import React, { useState, createContext } from 'react';

// Create a new context
export const AuthContext = createContext();

// AuthProvider component to wrap the entire app and manage the authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};
