
// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


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
