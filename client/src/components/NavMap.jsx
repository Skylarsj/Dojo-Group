import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePokemonContext } from '../hooks/usePokemonContext';
import PokeballSelector from './PokeballSelector';


const NavMap = () => {
    const Navigate = useNavigate();
    const { logout, reset } = useLogout();
    const {state} = useAuthContext();
    const {pokemonCount, resetPokemonCount } = usePokemonContext();

    const handlePokeballChange = (pokeball) => {
        // Do something with the selected pokeball
    };

    const Inventory = () => {
        Navigate('/inventory');
    }

    const handleLogout = () => {
        logout();
        reset();
    }

    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
            {/* Pokemon count */}
            <img className="h-16 w-16 ml-" src="./src/img/PokemonButton.png" alt="logo"/>
            <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
            <p className="font-mono text-black text-[20px] pt-6">{pokemonCount}</p>
            {/* Inventory button */}
            <button onClick={Inventory} className="w-18 border border-black h-auto m-4 ml-20 p-1 text-xs font-mono text-black bg-[#00C247]">inventory</button>
            {/* Logout button */}
            <button onClick={handleLogout} className="w-16 border border-black h-auto m-4 ml-auto p-1 text-xs font-mono text-black bg-[#00C247]">Logout</button>
        </div>
    );
}

export default NavMap;