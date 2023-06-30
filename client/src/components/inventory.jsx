import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bag = () => {
const Navigate = useNavigate();
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
                nickname: pokemon.nickname,
                user_id: pokemon.user_id,
            };
            })
        );
        console.log(pokemonObjects.length);
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
    console.log(currentPage);
    console.log("maths", Math.ceil(pokemonObjects.length / 1) - 1);
};

const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    console.log(currentPage);
    console.log("maths", Math.ceil(pokemonObjects.length / 1) - 1);
};

const renderPokemonSprites = () => {
    const startIndex = currentPage * 1;
    const endIndex = (currentPage + 1) * 1;
    return pokemonObjects.slice(startIndex, endIndex).map((pokemonObjects, index) => (
    <li key={index}>
        <div className="flex flex-col">
            <div className="flex h-1/2">
                <img className="w-20 h-20" src={pokemonObjects.sprite} alt={`Pokemon Sprite ${index}`} />
                <div className="flex-col w-[125px] text-[10px] font-mono text-black">
                    <p className="mt-2">Name:</p>
                    <p>{pokemonObjects.name}</p>
                    <p className="mt-1">Nickanme:</p>
                
                    <p>{pokemonObjects.nickname}</p>
                </div>
            </div>
            <div className="flex h-1/2 items-center justify-center">
                <button onClick={() => DeletePokemon(pokemonObjects.id)} className="w-20 h-10 text-xs mr-2 font-mono">release</button>
                <button onClick={() => goToChangeNickname(pokemonObjects)} className="w-20 h-10 text-xs pl-2.5 font-mono">nickname</button>
            </div>
        </div>
    </li>
    ));
};

const goToChangeNickname = (pokemon) => {
    Navigate("/change-nickname", { state: { pokemon: pokemon } });
};


const DeletePokemon = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/pokemon/delete/${id}`, { withCredentials: true })
    .then((response) => {
        console.log(response);
        setPokemonObjects((prevPokemonObjects) => prevPokemonObjects.filter(pokemon => pokemon.id !== id));
    })
    .catch((error) => {
        console.log(error);
    });
    
};


return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-[#00C247]">
        <div className="relative flex h-1/2 w-full border mx-auto">
            <button className="absolute border rounded-xl w-12 h-1/2 right-1 top-9 flex mx-auto just items-center bg-green-500 active:bg-green-800" onClick={goToNextPage} disabled={currentPage === Math.ceil(pokemonObjects.length / 1) - 1}>
            <img src="./src/img/arrow.png" alt="arrow" />
            </button>
            <button className="absolute border rounded-xl w-12 h-1/2 left-1 top-9 flex items-center bg-green-500 active:bg-green-800 " onClick={goToPreviousPage} disabled={currentPage === 0}>
                <img className="rotate-180" src="./src/img/arrow.png" alt="arrow" />
            </button>
            <div className="mx-auto">

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
