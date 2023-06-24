import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Map = () => {

const [pokemon, setPokemon] = useState({});

    //Handling logic to get random pokemon
const getPokemonData = async (pokemonType) => {
try {
    //call API w/ pokemonType as the perameter

        const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);

    //store the data from the API call
        const pokemonData = response.data;

    //get a random pokemon from the data, this will return an ID number
        const randomPokemon = Math.floor(Math.random() * pokemonData.pokemon.length);

    //get the name of the random pokemon using the ID number from the previous step
        const pokemonName = pokemonData.pokemon[randomPokemon].pokemon.name;

    //call the API again with the random pokemon name to get all the data of said pokemon
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    //store the data from the API call
        const pokemon = pokemonResponse.data;
    setPokemon(pokemon);

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