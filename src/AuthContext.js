import React, { useState, useContext } from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login() {
    // Perform login logic here, e.g. send a request to the server
    setIsAuthenticated(true);
  }

  function logout() {
    // Perform logout logic here, e.g. clear the authentication token
    setIsAuthenticated(false);
  }

  const contextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue} {...props} />;
}
