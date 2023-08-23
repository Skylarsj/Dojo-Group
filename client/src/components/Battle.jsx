import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import battle from '../music/battle.mp3';
import { useVolume } from '../hooks/useVolume';

const Battle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pokemon } = location.state || "";
  const [isLoading, setIsLoading] = useState(true);
  const [PokemonFontSize, setPokemonFontSize] = useState(0);
  const { volume } = useVolume();

  const adjustFontSize = () => {
    if (pokemon.name.length > 10) {
      setPokemonFontSize(10);
    } else {
      setPokemonFontSize(20);
    }
  };

  useEffect(() => {
    const audio = new Audio(battle);
    audio.volume = volume; 
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  

  return (
    <>
      <div
        className="absolute flex flex-col w-full h-full justify-center items-center inset-0 z-[-10] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('./src/img/NormalBattleBackground.jpeg')` }}
      />
      {/* POKEMON SPRITE */}
      <div className="absolute right-[2px] top-[60px] z-5 bg-no-repeat overflow-auto">
        <img
          className="w-[150px] h-[140px] object-contain"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      {/* BATTLE TAG */}
      <div>
        <p
          className={`w-[110px] h-6 absolute left-4 top-10 z-50 font-mono text-black ${
            PokemonFontSize > 10 ? 'text-base' : 'text-xs'
          }`}
        >
          {pokemon.name}
        </p>
        <div className="absolute left-[-120px] top-[-80px] z-[-30px] bg-no-repeat overflow-auto">
          <img
            className="w-[500px] h-full object-contain"
            src="./src/img/BattleTag.png"
            alt={pokemon.name}
          />
        </div>
      </div>
      {/* ASH SPRITE */}
      <div className="absolute left-[-30px] bottom-[11px] z-5 bg-no-repeat overflow-auto">
        <img
          className="w-[250px] h-full object-contain"
          src="./src/img/Ash_Battle.png"
          alt={pokemon.name}
        />
      </div>

      <div className="bg-cover w-[340px] h-[290px] flex justify-center items-end">
        <img
          className="w-[350px] h-[249px] pt-11 object-contain"
          src="./src/img/PokemonBattleFloor.png"
          alt="battle floor"
        />
      </div>
    </>
  );
};

export default Battle;