import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const NavCaptured = () => {
    const { state } = useAuthContext();
    const { logout } = useLogout(); 
    const [pokemonCount, setPokemonCount] = useState(0);
    const Navigate = useNavigate();

    const Map = () => {
        Navigate('/map');
    }

    const handleLogout = () => {
        logout();
        resetUsername(true);
 }

    useEffect(() => {
        const getPokemonData = async () => {
          try {
            if (state.user) {
              const user_id = state.user.results.user.id;
      
              // Get user's Pokemon data
              const savePokemonResponse = await axios.get(`http://localhost:5000/api/pokemon/get-all/${user_id}`);
              console.log(savePokemonResponse);
              const pokemonData = savePokemonResponse.data.pokemon;
      
    
              // Set the Pokemon count to the length of the Pokemon data array
              setPokemonCount(pokemonData.length);
            } else {
              // User is not logged in, redirect to login page or perform other actions
              Navigate("/");
              console.log("User is not logged in");
            }
          } catch (error) {
            // Handle error if the request fails
            console.error("An error occurred:", error);
          }
        };
      
        getPokemonData();
      }, [state.user]);



    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
            {/* Pokemon count */}
            <img className="h-16 w-16" src="./src/img/PokemonButton.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">{pokemonCount}</p>
            {/* Pokeball count */}
            <img className="h-20 w-auto pb-6" src="./src/img/NormalPokeball.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">1</p>
            <button onClick={Map} className="w-20 border border-black h-auto m-4 p-1 text-xs font-mono text-black bg-[#00C247]">map</button>
            <button onClick={handleLogout} className="w-16 border border-black h-auto m-4 ml-auto p-1 text-xs font-mono text-black bg-[#00C247]">Logout</button>
        </div>
    );
}

export default NavCaptured;