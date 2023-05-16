import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [setAuthenticated] = useState(false);

  const login = () => {
    // Perform your login logic here
    setAuthenticated(true);
  };

  const logout = () => {
    // Perform your logout logic here
    setAuthenticated(false);
  };

  const isAuthenticated = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('access_token=')) {
        const token = cookie.substring('access_token='.length);
        return !!token; // Check if the token exists
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
