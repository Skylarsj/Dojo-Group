import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../hooks/usePokemonContext';

const NavCaptured = () => {
    const { state } = useAuthContext();
    const { logout, reset } = useLogout(); 
    const Navigate = useNavigate();
    const {pokemonCount} = usePokemonContext();


    const Map = () => {
        Navigate('/map');
    }

    const handleLogout = () => {
        logout();
        reset();
        resetUsername(true);
 }

   



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