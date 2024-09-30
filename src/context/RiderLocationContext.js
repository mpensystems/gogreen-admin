import React, { createContext, useContext, useState } from 'react';

// Create the context
const RiderLocationContext = createContext(null);

// Create a custom hook to use the MapRefContext
export const useRiderLocationRef = () => useContext(RiderLocationContext);

// Create the provider component
export const RiderLocationProvider = ({ children }) => {
  const [riderLocation, setRiderLocation] = useState(null); // State to store the map reference

  return (
    <RiderLocationContext.Provider value={{ riderLocation, setRiderLocation }}>
      {children}
    </RiderLocationContext.Provider>
  );
};
