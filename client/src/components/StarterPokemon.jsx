import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import mapMusic from '../music/mapMusic.mp3';
import { useVolume } from '../hooks/useVolume';
import { usePokemonContext } from '../hooks/usePokemonContext';
import StarterPokemonBg from '../img/StarterPokemonBg.jpg';

const StarterPokemon = () => {
  const [starterPokemon, setStarterPokemon] = useState([]);
  const { state } = useAuthContext();
  const [pokemonCount, setPokemonCount] = useState(0);
  const { volume } = useVolume();
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { catchPokemon } = usePokemonContext();

  useEffect(() => {
    const getCount = async () => {
      try {
        if (state.user) {
          const response = await axios.get(`http://localhost:5000/api/pokemon/count/${state.user.results.user.id}`);
          setPokemonCount(response.data.count);
          console.log('data sent in map', response.data.count);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCount();
  }, [state.user]);

  useEffect(() => {
    const fetchStarterPokemon = async () => {
      const bulbasaur = await fetchPokemon('bulbasaur');
      const charmander = await fetchPokemon('charmander');
      const squirtle = await fetchPokemon('squirtle');
      setStarterPokemon([bulbasaur, charmander, squirtle]);
    };
    fetchStarterPokemon();
  }, []);

  const fetchPokemon = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return {
      name: data.name,
      image: data.sprites.front_default,
      sprites: data.sprites,
    };
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleStartGame = async () => {
    if (selectedPokemon) {
      try {
        if (state.user) {
          const capturedPokemon = {
            user_id: state.user.results.user.id,
            name: selectedPokemon.name,
            nickname: selectedPokemon.name,
            spriteURL: selectedPokemon.sprites.front_default,
          };

          const savePokemonResponse = await axios.post('http://localhost:5000/api/pokemon/save', capturedPokemon);
          console.log('Pokemon saved:', savePokemonResponse.data);
          navigate('/map');
          catchPokemon();
        } else {
          console.log('User is not logged in');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center" style={{ backgroundImage: `url(${StarterPokemonBg})`, backgroundSize: 'cover' }}>
      <h1 className="text-3xl font-bold mb-14">Choose A Pokemon!</h1>
      <div className="flex justify-center">
        {starterPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className={`flex flex-col items-center mx-1 cursor-pointer ${selectedPokemon === pokemon ? 'border-2 border-yellow-500 bg-yellow-200' : ''}`}
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <img src={pokemon.image} alt={pokemon.name} className="w-50 h-auto" />
            <p className={`text-l font-bold mt-2 ${selectedPokemon === pokemon ? 'text-black' : ''}`}>{pokemon.name}</p>
          </div>
        ))}
      </div>
     
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-4"
        onClick={handleStartGame}
        disabled={!selectedPokemon}
        style={{ opacity: selectedPokemon ? 1 : 0.5, cursor: selectedPokemon ? 'pointer' : 'not-allowed' }}
      >
        Start Game
      </button>
    </div>
  );
};

export default StarterPokemon;