import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBattle = ({ handlePopUp, handleCapture }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const handleCaptureClick = () => {
    const enteredNickname = prompt('Enter a nickname:');
    if (enteredNickname === null || enteredNickname.trim() === '') {
      alert('Please enter a nickname for the Pokémon.');
      return;
    }

    handleCapture({ name: 'Pikachu', spriteUrl: 'https://pokeapi.co/sprites/pikachu.png', nickname: enteredNickname });
    navigate('/captured-pokemon');
    navigate('/map');
  };
  

  return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black z-50">
      {/* Pokeball count */}
      <img
        onClick={() => {
          handlePopUp();
        }}
        className="h-20 w-auto pb-6"
        src="./src/img/NormalPokeball.png"
        alt="logo"
      />
      <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
      <p className="font-mono text-black text-[20px] pt-6">1</p>
      <button
        className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]"
        onClick={handleCaptureClick}
      >
        Capture!
      </button>
      <button onClick = ""className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]">
        Go back
      </button>
    </div>
  );
};

export default NavBattle;