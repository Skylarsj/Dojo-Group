import {pokemonContext} from '../context/pokemonContext';
import {useContext} from 'react';

export const usePokemonContext = () => {
    const context = useContext(pokemonContext);

    if (!context) {
        throw new Error("usePokemonContext must be used within a pokemonContextProvider");
    }

    return context;
}