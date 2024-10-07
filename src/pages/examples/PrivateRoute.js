// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the authentication context

const PrivateRoute = ({ element, requiredRole }) => {
  const { auth } = useAuth(); 

  console.log(auth,"AUTH");
  

  if (!auth?.token) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/unauthorized" />; 
  }

  return element;
};

export default PrivateRoute;
