import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { usePokemonContext } from '../hooks/usePokemonContext';
import { useBackground } from '../hooks/useBackground';

const NavInventory = () => {
    const Navigate = useNavigate();
    const { logout, reset } = useLogout();
    const {state} = useAuthContext();
    const {pokemonCount} = usePokemonContext();
    const {backgroundImage, setBackgroundImage} = useBackground();


    const handleLogout = () => {
        logout();
        reset();
        setBackgroundImage('');
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
            <img className="h-20 w-auto pb-6" src="./src/img/NormalPokeball.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">1</p>
            <button onClick={Map} className="w-20 border border-black h-auto m-4 ml-5 p-1 text-xs font-mono text-black bg-[#00C247]">map</button>
            <button onClick={handleLogout} className="w-16 border border-black h-auto m-4 ml-auto p-1 text-xs font-mono text-black bg-[#00C247]">Logout</button>
        </div>
    );
}

export default NavInventory;