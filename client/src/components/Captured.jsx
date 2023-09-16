import {React, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../hooks/usePokemonContext';

const CapturedForm = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const { pokemon } = location.state || "";
    const [nickname, setNickname] = useState("");
    console.log(pokemon);
    
 
    const Map  = () => {
        Navigate('/map');
    };

    const Inventory = () => {
        Navigate('/inventory');
    };
    
    function formatPokemonName(name) {
      // Split the name by dashes and capitalize the first letter of each word
      const words = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
      
      // Join the words back together with spaces
      return words.join(' ');
    }

    return (
      <div className="relative flex flex-col w-full h-full">
        <div className="absolute bottom-20 left-[80px] font-bold text-white shadow-lg">You caught a {formatPokemonName(pokemon.name)}!</div>
        <img className="w-[200px] h-[200px] mx-auto" src={pokemon.sprites.front_default} alt={formatPokemonName(pokemon.name)} />
        <div className="flex justify-center space-x-4">
          <button className="font-bold bg-green-500 text-white px-4 py-2 rounded" onClick={Map}>Map</button>
          <button className="font-bold bg-green-500 text-white px-4 py-2 rounded" onClick={Inventory}>Inventory</button>
        </div>
      </div>
    );
}

export default CapturedForm;