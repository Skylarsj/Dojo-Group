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
        <div className="w-full h-full">
            {pokemon.sprites && pokemon.sprites.front_default && <div className="flex flex-wrap bg-cover w-[340px] h-[290px]" style={{ backgroundImage: `url(${pokemon.sprites.front_default})`}}/>
            }
            <Map getPokemon={foundPokemon}/>
            <Navbar/>
        </div>
)
}
export default PokemonSearch