


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element, requiredRoles }) => {
  const { auth } = useAuth(); 

  console.log(auth, "AUTH");

  // Redirect to sign-in if the user is not authenticated
  if (!auth?.token) {
    return <Navigate to="/signin" />;
  }

  // Check if the user's role matches any role in the requiredRoles array
  if (requiredRoles && !requiredRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return element;
};

export default PrivateRoute;
