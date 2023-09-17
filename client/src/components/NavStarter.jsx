import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { usePokemonContext } from '../hooks/usePokemonContext';
import PokeballSelector from './PokeballSelector';

const NavInventory = () => {
    const Navigate = useNavigate();
    const { logout, reset } = useLogout();
    const {state} = useAuthContext();
    const {pokemonCount} = usePokemonContext();


    const handleLogout = () => {
        logout();
        reset();
    }

    const Map = () => {
        Navigate('/map');
    }

 


    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
            {/* Pokemon count */}
            <img className="h-16 w-16" src="./src/img/PokemonButton.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">{pokemonCount}</p>
            {/* Pokeball count */}
            <div style={{ marginTop: '3%', marginLeft: '12%' }}>
                <PokeballSelector />
            </div>
           
            <button onClick={handleLogout} className="w-16 border border-black h-auto m-4 ml-auto p-1 text-xs font-mono text-black bg-[#00C247]">Logout</button>
        </div>
    );
}

export default NavInventory;