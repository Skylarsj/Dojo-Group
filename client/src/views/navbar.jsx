import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import NavMap from '../components/NavMap';
import NavBattle from '../components/NavBattle';
import NavInventory from '../components/navInventory';
import NavCaptured from '../components/NavCaptured';

const Navbar = () => {
    const [navMap, setNavMap] = useState(true);
    const [navBattle, setNavBattle] = useState(false);
    const [navCaptured, setNavCaptured] = useState(false);
    const [navInventory, setNavInventory] = useState(false);

const location = useLocation();

const [pokemonCount, setPokemonCount] = useState(0);
const [pokeballCount, setPokeballCount] = useState(0);



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

useEffect(() => {

    const getPokemonCount = async (userId) => {
        try {
        const PokemonCount = await axios.get(`http://localhost:5000/api/pokemon/get-all/${userID}`, { withCredentials: true });
            setPokemonCount(PokemonCount.data.pokemon.length);
        } catch (error) {
        console.error("An error occurred:", error);
        }
    }
    getPokemonCount();

    const path = location.pathname
    if (path === '/map') {
    setNavMap(true)
    setNavBattle(false)
    setNavCaptured(false)
    setNavInventory(false)
    }
    if (path === '/battle') {
    setNavBattle(true)
    setNavMap(false)
    setNavCaptured(false)
    setNavInventory(false)
    }
    if (path === '/captured') {
    setNavCaptured(true)
    setNavMap(false)
    setNavBattle(false)
    setNavInventory(false)
    }
    if (path === '/') {
    setNavMap(false)
    setNavBattle(false)
    setNavCaptured(false)
    setNavInventory(false)
    }
    if ( path === '/register') {
    setNavMap(false)
    setNavBattle(false)
    setNavCaptured(false)
    setNavInventory(false)
    }
    if ( path === '/inventory') {
    setNavMap(false)
    setNavBattle(false)
    setNavCaptured(false)
    setNavInventory(true)
    }
}, [location])

return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
    {navBattle && <NavBattle />}
    {navMap && <NavMap />}
    {navCaptured && <NavCaptured />}
    {navInventory && <NavInventory />}
    </div>
);
}

export default Navbar;