'use client'

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  // Initialize any shared state here (example: user, theme, etc.)
  const [email, setEmail] = useState();
    const [name, setName] = useState();

  return (
    <AppContext.Provider value={{ email, setEmail,name, setName }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}
