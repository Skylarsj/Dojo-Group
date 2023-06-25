import React from "react";
import { useState, useEffect } from "react";
// components
import Map from "../components/map.jsx";
import Navbar from "../components/navbar.jsx";


const PokemonSearch = () => {

    const [pokemon, setPokemon] = useState({});

    const foundPokemon = (pokemon) => {
        setPokemon(pokemon);
        console.log("found pokemon", pokemon.sprites.front_default)
    }

    return (
        <>
        <div className="w-full h-full">
            <Map getPokemon={foundPokemon}/>
            <Navbar/>
        </div>
        </>
)
}
export default PokemonSearch