import React, { useContext } from 'react';
import { BackgroundContext } from '../context/Background';

export const useBackground = () => {
  const context = useContext(BackgroundContext);

  if (!context) {
    throw new Error("usePokemonContext must be used within a pokemonContextProvider");
}

return context;
}