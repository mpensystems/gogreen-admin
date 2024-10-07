import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const expiry = sessionStorage.getItem('expiry');

    if (token && expiry && Date.now() < Number(expiry)) {
      return { token, role, expiry: Number(expiry) };
    }
    return null;
  });

  const updateAuth = (token, role, expiry) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('expiry', expiry);

    setAuth({ token, role, expiry: Number(expiry) });
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('expiry');
    setAuth(null);
  };

  // Automatically log out if the token is expired
  // useEffect(() => {
  //   if (auth && Date.now() >= auth.expiry) {
  //     logout();
  //   }
  // }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
