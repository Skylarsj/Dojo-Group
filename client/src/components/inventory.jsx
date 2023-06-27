import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bag = () => {
const [pokemonSprites, setPokemonSprites] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

const getPokemonData = async (pokemonType) => {
    try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const pokemonData = response.data;

    const spriteUrls = await Promise.all(
        pokemonData.pokemon.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.pokemon.url);
        const pokemonDetails = pokemonResponse.data;
        return pokemonDetails.sprites.front_default;
        })
    );

    setPokemonSprites(spriteUrls);
    } catch (error) {
    console.error(error);
    }
};

useEffect(() => {
    getPokemonData('normal');
}, []);

const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
};

const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
};

const renderPokemonSprites = () => {
    const startIndex = currentPage * 1; // Adjust the number of Pokémon per page here
    const endIndex = (currentPage + 1) * 1;

    return pokemonSprites.slice(startIndex, endIndex).map((spriteUrl, index) => (
    <li key={index}>
        <img src={spriteUrl} alt={`Pokemon Sprite ${index}`} />
    </li>
    ));
};

return (
    <div className="flex flex-col w-full h-full overflow-hidden">
    <div className="border h-1/2 w-full">
        <div className="flex justify-between">
        <button
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-l"
            onClick={goToPreviousPage}
            hidden={currentPage === 0}
        >
            Previous
        </button>
        <button
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-r"
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(pokemonSprites.length / 1) - 1} // Adjust the number of Pokémon per page here
        >
            Next
        </button>
        </div>
        <ul className="flex flex-wrap justify-center">
        {renderPokemonSprites()}
        </ul>
    </div>
    <div className="border border-red-600 h-1/2 w-full"></div>
    </div>
);
};

export default Bag;
