import {React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext"
import PokeballSelector from './PokeballSelector';
import { usePokemonContext } from '../hooks/usePokemonContext';


const NavBattle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuthContext();
  const { pokemon, captureRate } = location.state || "";
  const [selectedPokeball, setSelectedPokeball] = useState(null);
  console.log("selectedPokeball", selectedPokeball);
  const { catchPokemon } = usePokemonContext();

  const handleGoBackClick = () => {
    navigate('/map');
  };

  const handlePokeballChange = (selected) => {
    setSelectedPokeball(selected);
  };

  const capture_pokemon = (capture_rate, pokeball_type) => {
    let capture_rate_multiplier;
    switch (pokeball_type) {
      case 'null':
        capture_rate_multiplier = 1;
        break;
      case 'pokeball':
        capture_rate_multiplier = 1;
        break;
      case 'greatball':
        capture_rate_multiplier = 1.5;
        break;
      case 'ultraball':
        capture_rate_multiplier = 2;
        break;
      case 'masterball':
        capture_rate_multiplier = 255;
        break;
      default:
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

  const goToChangeNickname = (pokemon) => {
    navigate('/change-nickname', { state: { pokemon: pokemon } });
  };
  const isCaught = capture_pokemon(captureRate, selectedPokeball?.id);

  const savePokemon = async () => {
    try {
      if (isCaught === true) {
        navigate('/map');
      } else if (state.user) {
        const capturedPokemon = {
          user_id: state.user.results.user.id,
          name: pokemon.name,
          nickname:  pokemon.name,
          spriteURL: pokemon.sprites.front_default,
        };

        const savePokemonResponse = await axios.post("http://localhost:5000/api/pokemon/save", capturedPokemon);
        goToChangeNickname(pokemon);
        catchPokemon();
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      {/* popup */}
      <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black z-50">
        {/* Pokeball selector */}
        <div style={{ marginTop: '3%', marginLeft: '12%' }}>
          <PokeballSelector onChange={handlePokeballChange} />
        </div>
        <button
          className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]"
          onClick={savePokemon}
        >
          Capture!
        </button>
        <button
          className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]"
          onClick={handleGoBackClick}
        >
          RUN!
        </button>
      </div>
    </>
  );
};
export default NavBattle;