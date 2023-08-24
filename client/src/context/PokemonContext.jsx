import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const pokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonCount, setPokemonCount] = useState(0);
  const { state } = useAuthContext();

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        if (state.user) {
          const user_id = state.user.results.user.id;

          // Get user's Pokemon data
          const savePokemonResponse = await axios.get(`http://localhost:5000/api/pokemon/get-all/${user_id}`);
          console.log(savePokemonResponse);
          const pokemonData = savePokemonResponse.data.pokemon;

          // Set the Pokemon count to the length of the Pokemon data array
          setPokemonCount(pokemonData.length);
        }
      } catch (error) {
        // Handle error if the request fails
        console.error("An error occurred:", error);
      }
    };

    getPokemonData();
  }, [state.user]);

  return (
    <pokemonContext.Provider value={{ pokemonCount }}>
      {children}
    </pokemonContext.Provider>
  );
};