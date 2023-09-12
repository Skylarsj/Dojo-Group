import {React, useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext"
import PokeballSelector from './PokeballSelector';


const NavBattle = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { state } = useAuthContext();
    //this is coming from the battle component
    const {pokemon} = location.state || "";
    console.log(pokemon);
    

    const capturePokemon = () => {
        navigate('/captured', { state: { pokemon } });
    };

    const handleGoBackClick = () => {
        navigate('/map');
    };

    const handlePokeballChange = (pokeball) => {
        // Do something with the selected pokeball
    };

    

    


    return (
        <>
        {/* popup */}
            <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black z-50">
            {/* Pokeball count */}
           {/* Pokeball selector */}
           <div style={{ marginTop: '3%', marginLeft: '12%'}}>
            <PokeballSelector onChange={handlePokeballChange} />
            </div>
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
                RUN!
            </button>
            </div>
        </>
    );
};

export default NavBattle;