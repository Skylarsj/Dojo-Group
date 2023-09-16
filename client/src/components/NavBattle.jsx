import {React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext"
import PokeballSelector from './PokeballSelector';
import { usePokemonContext } from '../hooks/usePokemonContext';
import {useCapture} from '../hooks/useCapture';


const NavBattle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuthContext();
  const { pokemon, captureRate } = location.state || "";
  const [selectedPokeball, setSelectedPokeball] = useState({ id: 'normal' });
  console.log("selectedPokeball", selectedPokeball?.id);
  const { catchPokemon } = usePokemonContext();
  const [isCaught, setIsCaught] = useState(false);
  const { pokemonEscaped, resetCaptureStatus } = useCapture();


  const handleGoBackClick = () => {
    navigate('/map');
    resetCaptureStatus();
  };

  const handlePokeballChange = (selected) => {
    setSelectedPokeball(selected);
  };

  function formatPokemonName(name) {
    // Split the name by dashes and capitalize the first letter of each word
    const words = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Join the words back together with spaces
    return words.join(' ');
  }

  const capture_pokemon = async (capture_rate, pokeball_type, callback) => {
    console.log("capture_rate", capture_rate);
    console.log("pokeball_type", pokeball_type);
  
    // Define capture rate multipliers based on the pokeball_type
    let ballFactor;
    switch (pokeball_type) {
      case 'normal':
        ballFactor = 1;
        break;
      case 'great':
        ballFactor = 1.5;
        break;
      case 'ultra':
        ballFactor = 2;
        break;
      case 'master':
        ballFactor = 255; // Master Ball should guarantee capture
        break;
      default:
        ballFactor = 1; // Default to 1 for unknown ball types
    }
  
    // Calculate the modified capture rate
    const modified_capture_rate = capture_rate * ballFactor;
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
        // Call capture_pokemon without await
        capture_pokemon(captureRate, selectedPokeball?.id, (captured) => {
          if (captured) {
            setIsCaught(true);
          } else {
            console.log("The Pokemon fled!");
            // Display a message to the user that the Pokemon fled
            setIsCaught(false); // Set isCaught to false when the Pokemon flees
            pokemonEscaped();
          }
  
          axios.post("http://localhost:5000/api/pokeballs/use", {
            user_id: state.user.results.user.id,
            pokeball_type: selectedPokeball.id,
          }).then((usePokeballResponse) => {
            if (usePokeballResponse.status === 200 && captured) {
              savePokemon();
            } else {
              console.log("Error using Pokeball:", usePokeballResponse.data.error);
            }
          });
        });
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
          const capturedPokemon = {
            user_id: state.user.results.user.id,
            name: formatPokemonName(pokemon.name),
            nickname: formatPokemonName(pokemon.name),
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