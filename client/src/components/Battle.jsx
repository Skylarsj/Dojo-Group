import React, { useEffect, useState } from 'react';
import { useLocation,   } from 'react-router-dom';
import battle from '../music/battle.mp3';
import { useVolume } from '../hooks/useVolume';
import { useCapture } from '../hooks/useCapture';
import pokemon_flee from '../img/pokemon_flee.png';


const Battle = () => {
  const location = useLocation();
  const { pokemon } = location.state || "";
  const [isLoading, setIsLoading] = useState(true);
  const [PokemonFontSize, setPokemonFontSize] = useState(0);
  const { volume } = useVolume();
  const { isCaptured, resetCaptureStatus } = useCapture();

  // Determine the message to display based on capture status
  const formattedPokemonName = formatPokemonName(pokemon.name);
  const message = isCaptured ? `${formattedPokemonName} Has Appeared!` : `${formattedPokemonName} Has fled...`;

  useEffect(() => {
    const audio = new Audio(battle);
    audio.volume = volume;
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
    };
    
  }, []);

  function formatPokemonName(name) {
    // Split the name by dashes and capitalize the first letter of each word
    const words = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Join the words back together with spaces
    return words.join(' ');
  }

  

  const adjustFontSize = () => {
    if (pokemon.name.length > 10) {
      setPokemonFontSize(10);
    } else {
      setPokemonFontSize(20);
    }
  };

  return (
    <>
      <div
        className="absolute flex flex-col w-full h-full justify-center items-center inset-0 z-[-10] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('./src/img/NormalBattleBackground.jpeg')` }}
      />
      <div className="absolute right-[2px] top-[60px] z-5 bg-no-repeat overflow-auto">
        <img
          className="w-[150px] h-[140px] object-contain"
          src={isCaptured ? pokemon.sprites.front_default : pokemon_flee}
          alt={message}
        />
      </div>
      <div>
        <p
          className={`w-[180px] h-12 absolute left-.5 top-9 z-50 font-mono text-black ${
            PokemonFontSize > 10 ? 'text-base' : 'text-xs'
          }`}
          style={{ backgroundColor: '#00C247', borderRadius: '10px', padding: '1px' }}
        >
          {message}
        </p>
        <div className="absolute left-[-120px] top-[-80px] z-[-30px] bg-no-repeat overflow-auto">
          <img
            className="w-[500px] h-full object-contain"
            src="./src/img/BattleTag.png"
            alt={message}
          />
        </div>
      </div>
      <div className="absolute left-[-30px] bottom-[11px] z-5 bg-no-repeat overflow-auto">
        <img
          className="w-[250px] h-full object-contain"
          src="./src/img/Ash_Battle.png"
          alt={message}
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