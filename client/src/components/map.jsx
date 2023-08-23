import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import mapMusic from '../music/mapMusic.mp3';
import { useVolume } from '../hooks/useVolume';


const Map = () => {
  const Navigate = useNavigate();
  const {state }  = useAuthContext()
  const [pokemonCount, setPokemonCount] = useState(0);
  const { volume} = useVolume();
  // console.log("map", state.user)

  useEffect(() => {
    const getCount = async () => {
      try {
        if (state.user) {
          const response = await axios.get(`http://localhost:5000/api/pokemon/count/${state.user.results.user.id}`);
          setPokemonCount(response.data.count);
          console.log("data sent in map",response.data.count);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCount();
  }, [state.user]);

  useEffect(() => {
    const audio = new Audio(mapMusic);
    audio.volume = volume; // Set volume to 25%
    audio.loop = true; // Set loop to true
    audio.play();
    return () => {
      audio.pause();
    };
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
        console.log('no sprite');
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
    
    <div
      className="flex flex-wrap bg-cover w-[340px] h-[290px] overflow-hidden"
      style={{ backgroundImage: `url('./src/img/map2.png')` }}
    >
      {/* Upper Left */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('normal')} />
      {/* Upper Middle */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('flying')} />
      {/* Upper Right */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('rock')} />
      {/* Lower Left */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('ground')} />
      {/* Lower Middle */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('water')} />
      {/* Lower Right */}
      <div className="w-1/3 h-1/2" onClick={() => getPokemonData('grass')} />
    </div>
  );
};

export default Map;