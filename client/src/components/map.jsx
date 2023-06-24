import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Map = () => {

    //Handling logic to get random pokemon
const getPokemonData = async (pokemonType) => {
try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const pokemonData = response.data;
    console.log(pokemonData);
    console.log(pokemonData.pokemon.length)
} catch (error) {
    console.error(error);
}
};

    return (
        <div className="flex flex-wrap bg-cover w-[340px] h-[290px]" style={{ backgroundImage: `url('./src/img/map2.png')` }}>
        {/* Upper Left */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('normal')}/>
        {/* Upper Middle */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('flying')}/>
        {/* Upper Right */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('rock')}/>
        {/* Lower Left */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('ground')}/>
        {/* Lower Middle */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('water')}/>
        {/* Lower Right */}
            <div className="w-1/3 h-1/2" onClick={() => getPokemonData('grass')}/>
        </div>
    )
    }
export default Map