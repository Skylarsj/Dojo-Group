import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

const NavBattle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //this is coming from the battle component
    const {pokemon} = location.state || "";
    console.log(pokemon);

    const capturePokemon = () => {
        navigate('/captured', { state: { pokemon } });
    };

    const handleGoBackClick = () => {
        navigate('/map');
    };


    //THIS IS A TEST
    return (
        <>
        {/* popup */}
            <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black z-50">
            {/* Pokeball count */}
            <img
                className="h-20 w-auto pb-6"
                src="./src/img/NormalPokeball.png"
                alt="logo"
            />
            <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
            <p className="font-mono text-black text-[20px] pt-6">1</p>
            <button
                className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]"
                onClick={capturePokemon}
            >
                Capture!
            </button>
            <button
                className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]"
                onClick={handleGoBackClick}
            >
                Go back
            </button>
            </div>
        </>
    );
};

export default NavBattle;