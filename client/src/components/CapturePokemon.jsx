import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Battle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pokemon } = location.state || "";
    const [isLoading, setIsLoading] = useState(true);
    const 

    useEffect(() => {
        if (pokemon === null || pokemon === undefined) {
            navigate('/map');
        } else {
            setIsLoading(false);
        }
    }, [pokemon, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return(
        <>
        <div className="absolute flex flex-col w-full h-full justify-center items-center inset-0 z-[-10] bg-no-repeat bg-cover" style={{ backgroundImage: `url('./src/img/NormalBattleBackground.jpeg')` }}/>
{/* POKEMON SPRITE */}
        <div className="absolute left-[200px] top-12 z-5 bg-no-repeat overflow-auto">
            <img
                className="w-[150px] h-[150px] object-contain"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}/>
        </div>
{/* BATTLE TAG */}
        <div>
            <p className=" w-[110px] h-6 absolute left-4 top-10 z-50 font-mono text-black">{pokemon.name}</p>
            <div className="absolute left-[-120px] top-[-80px] z-[-30px] bg-no-repeat overflow-auto">
                <img
                    className="w-[500px] h-full object-contain"
                    src='./src/img/BattleTag.png'
                    alt={pokemon.name}/>
            </div>
        </div>
{/* ASH SPRITE */}
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