'use client'

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  // Initialize shared state
  const [email, setEmail] = useState(null);  // Or an empty string ""
  const [name, setName] = useState(null);    // Or an empty string ""

  return (
    <AppContext.Provider value={{ email, setEmail, name, setName }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export const useAppContext = () => {
  return  useContext(AppContext);
}