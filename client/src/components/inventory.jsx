import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Bag = () => {
const [pokemonObjects, setPokemonObjects] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

useEffect(() => {
    const getPokemonData = async () => {
    try {
        // Check login status
        const loginCheckResponse = await axios.get('http://127.0.0.1:5000/api/check-login', { withCredentials: true });
        const loginCheckData = loginCheckResponse.data;
        console.log(loginCheckData);

        if (loginCheckData.logged_in) {
        const user_id = loginCheckData.user_id;

        // Get user's Pokemon data
        const savePokemonResponse = await axios.get(`http://localhost:5000/api/pokemon/get-all/${user_id}`, { withCredentials: true });
        console.log(savePokemonResponse);
        const pokemonData = savePokemonResponse.data;
        
        // Fetch details for each Pokemon
        const pokemonObjects = await Promise.all(
            pokemonData.pokemon.map(async (pokemon) => {
            return {
                name: pokemon.name,
                id: pokemon.id,
                sprite: pokemon.SpriteURL,
                user_id: pokemon.user_id,
            };
            })
        );
        console.log(pokemonData);
        return setPokemonObjects(pokemonObjects);
        // ...
        } else {
        // User is not logged in, redirect to login page or perform other actions
        Navigate("/");
        console.log("User is not logged in");
        }
    } catch (error) {
        // Handle error if the request fails
        console.error("An error occurred:", error);
    }
    };

    getPokemonData();
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
            <img className="w-20 h-20" src={pokemonObjects.sprite} alt={`Pokemon Sprite ${index}`} />
            <div className="flex-col w-[125px] text-[10px] font-mono text-black">
                <p className="mt-2">Name:</p>
                <p>{pokemonObjects.name}</p>
                <p className="mt-1">Nickanme:</p>
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
            <div className="mx-auto">
                <div className="flex h-1/2 items-center justify-center">
                    <ul className="">
                        {renderPokemonSprites()}
                    </ul>
                </div>
                <div className="flex h-1/2 items-center justify-center">
                    <button className="w-20 h-10 text-xs mr-2 font-mono">release</button>
                    <button className="w-20 h-10 text-xs pl-2.5 font-mono">nickname</button>
                </div>
            </div>
        </div>
    <div className="h-1/2 w-full bg-slate-600">
        <p>Pokeball logic will go here</p>
    </div>
    </div>
);
};

export default Bag;
