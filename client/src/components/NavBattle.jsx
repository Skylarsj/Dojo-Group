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
  console.log("selectedPokeball", selectedPokeball?.id);
  const { catchPokemon } = usePokemonContext();
  const [isCaught, setIsCaught] = useState(false);

  const handleGoBackClick = () => {
    navigate('/map');
  };

  const handlePokeballChange = (selected) => {
    setSelectedPokeball(selected);
  };

  const capture_pokemon = async (capture_rate, pokeball_type, callback) => {
    console.log("capture_rate", capture_rate);
    console.log("pokeball_type", pokeball_type);
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
    }
  
    // Calculate the modified capture rate
    const modified_capture_rate = Math.floor((3 * capture_rate * capture_rate_multiplier) / 100);
    console.log("capture_rate_multiplier", capture_rate_multiplier);
    console.log("capture_rate", capture_rate);
    console.log("modified_capture_rate", modified_capture_rate);
  
    // Generate a random number between 0 and 255
    const random_number = Math.floor(Math.random() * 256);
    console.log("random_number", random_number);
  
    // Check if the Pokemon was successfully captured
    const isCaught = random_number < modified_capture_rate;
    console.log("isCaught", isCaught);
  
    try {
      // Perform asynchronous operation
      await callback(isCaught);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  const goToChangeNickname = (pokemon) => {
    navigate('/captured', { state: { pokemon: pokemon } });
  };
  
 
  console.log("isCaught", isCaught);
  const usePokeball = async () => {
    try {
      if (selectedPokeball) {
        // Call capture_pokemon and await its result
        const captured = await capture_pokemon(captureRate, selectedPokeball?.id);
        if (captured) {
          setIsCaught(true);
          const usePokeballResponse = await axios.post("http://localhost:5000/api/pokeballs/use", {
            user_id: state.user.results.user.id,
            pokeball_type: selectedPokeball.id, // Use selectedPokeball.id
          });
          if (usePokeballResponse.status === 200) {
            savePokemon();
          } else {
            console.log("Error using Pokeball:", usePokeballResponse.data.error);
          }
        } else {
          console.log("The Pokemon fled!");
          // Display a message to the user that the Pokemon fled
        }
      } else {
        console.log("No Pokeball selected");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const savePokemon = async () => {
    try {
      if (state.user) {
        if (isCaught == true) {
          const capturedPokemon = {
            user_id: state.user.results.user.id,
            name: pokemon.name,
            nickname: pokemon.name,
            spriteURL: pokemon.sprites.front_default,
          };
  
          const savePokemonResponse = await axios.post("http://localhost:5000/api/pokemon/save", capturedPokemon);
  
          if (savePokemonResponse.status === 200) {
            goToChangeNickname(pokemon);
            catchPokemon();
          } else {
            console.log("Error saving Pokemon:", savePokemonResponse.data.error);
          }
        } else {
          console.log("Pokemon was not caught.");
        }
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
          onClick={usePokeball}
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