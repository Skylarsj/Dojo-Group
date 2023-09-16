import React, { createContext, useContext, useState } from 'react';

export const CaptureStatusContext = createContext();

export const CaptureStatusProvider = ({ children }) => {
  const [isCaptured, setIsCaptured] = useState(false);

  const pokemonEscaped = () => {
    setIsCaptured(false);
  };

  const resetCaptureStatus = () => {
    setIsCaptured(true);
  }

  return (
    <CaptureStatusContext.Provider value={{ isCaptured, pokemonEscaped, setIsCaptured, resetCaptureStatus }}>
      {children}
    </CaptureStatusContext.Provider>
  );
};