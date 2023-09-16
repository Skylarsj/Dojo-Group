import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import mapMusic from '../music/mapMusic.mp3';
import { useVolume } from '../hooks/useVolume';
import { useCapture } from '../hooks/useCapture';


const Map = () => {
  const Navigate = useNavigate();
  const {state }  = useAuthContext()
  const [pokemonCount, setPokemonCount] = useState(0);
  const { volume} = useVolume();
  const { resetCaptureStatus } = useCapture();

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
    audio.volume = volume;
    audio.loop = true; 
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  const capture_pokemon = (capture_rate, pokeball_type) => {
    let capture_rate_multiplier;
    switch (pokeball_type) {
      case 'normal':
        capture_rate_multiplier = 1;
        break;
      case 'great':
        capture_rate_multiplier = 1.5;
        break;
      case 'ultra':
        capture_rate_multiplier = 2;
        break;
      case 'master':
        capture_rate_multiplier = 255;
        break;
      default:
        throw new Error('Invalid Pokeball type');
    }
  
    // Calculate the modified capture rate
    const modified_capture_rate = Math.floor((3 * capture_rate * capture_rate_multiplier) / 100);
  
    // Generate a random number between 0 and 255
    const random_number = Math.floor(Math.random() * 256);
  
    // Check if the Pokemon was successfully captured
    if (random_number < modified_capture_rate) {
      return true;
    } else {
      return false;
    }
  };


  const getPokemonData = async (pokemonType) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
      // Store the data from the API call
      const pokemonData = response.data;
      console.log(pokemonData);
      const randomPokemon = Math.floor(Math.random() * pokemonData.pokemon.length);
      const pokemonName = pokemonData.pokemon[randomPokemon].pokemon.name;
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemon = pokemonResponse.data;
  
      // Fetch the species data to get the capture rate
      const speciesResponse = await axios.get(pokemon.species.url);
      const speciesData = speciesResponse.data;
      const captureRate = speciesData.capture_rate;
  
      // Determine if the Pokemon is successfully captured using the capture rate and a Pokeball type
      const isCaptured = capture_pokemon(captureRate, 'normal');
      resetCaptureStatus();
  
      // Send the Pokemon data and capture status to the parent component
      Navigate(`/battle`, { state: { pokemon, isCaptured, captureRate } });
    } catch (error) {
      console.error(error);
    }
  }

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