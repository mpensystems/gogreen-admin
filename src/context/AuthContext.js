import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    return token ? { token, role } : null;
  });

  const updateAuth = (token, role) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    setAuth({ token, role });
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
