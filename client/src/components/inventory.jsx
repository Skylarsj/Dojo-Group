import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bag = () => {
const [pokemonObjects, setPokemonObjects] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

const getPokemonData = async (pokemonType) => {
    try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const pokemonData = response.data;

    const pokemonObjects = await Promise.all(
        pokemonData.pokemon.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.pokemon.url);
        const pokemonDetails = pokemonResponse.data;
        return {
            name: pokemonDetails.name,
            sprites: pokemonDetails.sprites,
        }
        })
    );

    setPokemonObjects(pokemonObjects);
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

    return pokemonObjects.slice(startIndex, endIndex).map((pokemonObjects, index) => (
    <li key={index}>
        <div className="flex">
            <img src={pokemonObjects.sprites && pokemonObjects.sprites.front_default} alt={`Pokemon Sprite ${index}`} />
            <div className="flex-col w-[125px] text-[12px] font-mono ">
                <p className="mt-2">Name:</p>
                <p>{pokemonObjects.name}</p>
                <p className="mt-2">Nickanme:</p>
                <p>nickname</p>
            </div>
        </div>
    </li>
    ));
};

return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-[#00C247]">
        <div className="relative flex h-1/2 w-full border mx-auto">
            <div className="absolute border rounded-xl w-12 h-1/2 right-1 top-9 flex mx-auto just items-center active:bg-green-500" onClick={goToNextPage} disabled={currentPage === Math.ceil(pokemonObjects.length / 1) - 1}>
                <img src="./src/img/arrow.png" alt="arrow" />
            </div>

            <div className="absolute border rounded-xl w-12 h-1/2 left-1 top-9 flex items-center " onClick={goToPreviousPage} disabled={currentPage === Math.ceil(pokemonObjects.length / 1) - 1}>
                <img className="rotate-180" src="./src/img/arrow.png" alt="arrow" />
            </div>
            <div className="flex items-center justify-center border-red-500 border mx-auto">
                <ul className="">
                    {renderPokemonSprites()}
                </ul>
            </div>
        </div>
    <div className="h-1/2 w-full bg-slate-600">
        <p>Pokeball logic will go here</p>
    </div>
    </div>
);
};

export default Bag;
