import {React, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Map = () => {
const Navigate = useNavigate();

    useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/check-login')
        .then(response => response.data)
        .then(data => {
            console.log(data);
        if (data.logged_in) {
            // User is logged in, perform necessary actions
            console.log("Logged in as:", data.username);
        } else {
            // User is not logged in, redirect to login page or perform other actions
            console.log("User is not logged in");
        }
        })
        .catch(error => {
        // Handle error if the request fails
        console.error("An error occurred:", error);
        });
    }, []);

const getPokemonData = async (pokemonType) => {
try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
//store the data from the API call
    const pokemonData = response.data;
    console.log(pokemonData);
            const randomPokemon = Math.floor(Math.random() * pokemonData.pokemon.length);
            const pokemonName = pokemonData.pokemon[randomPokemon].pokemon.name;
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = pokemonResponse.data;
//login to see if the pokemon has a sprite
    if (pokemon.sprites.front_default === null) {
        console.log("no sprite")
        getPokemonData(pokemonType);
    } else {
//send the pokemon data to the parent component if it has a sprite
    Navigate(`/battle`, { state: { pokemon } });
    }
} catch (error) {
    console.error(error);
}
};

    return (
        <div className="flex flex-wrap bg-cover w-[340px] h-[290px] overflow-hidden" style={{ backgroundImage: `url('./src/img/map2.png')` }}>
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