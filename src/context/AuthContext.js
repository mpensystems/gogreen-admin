import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a custom hook to use the MapRefContext
export const useAuthRef = () => useContext(AuthContext);

// Create the provider component
export const RiderLocationProvider = ({ children }) => {
  const [riderLocation, setRiderLocation] = useState(null); // State to store the map reference

  return (
    <AuthContext.Provider value={{ riderLocation, setRiderLocation }}>
      {children}
    </AuthContext.Provider>
  );
};
