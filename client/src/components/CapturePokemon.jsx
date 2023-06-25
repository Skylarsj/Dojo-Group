import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Battle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pokemon } = location.state || {};
//if there is no pokemon, redirect to the map
    useEffect(() => {
        if(!pokemon){
            navigate('/map');
        }
    }, [pokemon, navigate]);

    return(
        <>
        <div className="absolute flex flex-col w-full h-full justify-center items-center inset-0 z-[-10] bg-no-repeat bg-cover" style={{ backgroundImage: `url('./src/img/NormalBattleBackground.jpeg')` }}/>

        <div className="absolute left-[200px] top-12 z-5 bg-no-repeat overflow-auto">
            <img
                className="w-[150px] h-[150px] object-contain"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}/>
        </div>

        <div className="absolute left-[-30px] top-[90px] z-5 bg-no-repeat overflow-auto">
            <img
                className="w-[250px] h-full object-contain"
                src='./src/img/Ash_Battle.png'
                alt={pokemon.name}/>
        </div>

        <div className="bg-cover w-[340px] h-[290px] flex justify-center items-end">
            <img 
                className="w-[350px] h-[250px] pt-11 object-contain"
                src="./src/img/PokemonBattleFloor.png"
                alt="battle floor"
            />
        </div>
        </>
    )
}

export default Battle;