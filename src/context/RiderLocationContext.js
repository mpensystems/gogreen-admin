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




import React, { createContext, useContext, useState } from 'react';

const RiderLocationContext = createContext(null);

export const useRiderLocationRef = () => useContext(RiderLocationContext);

export const RiderLocationProvider = ({ children }) => {
  const [riderLocation, setRiderLocation] = useState(null); 

  return (
    <RiderLocationContext.Provider value={{ riderLocation, setRiderLocation }}>
      {children}
    </RiderLocationContext.Provider>
  );
};
