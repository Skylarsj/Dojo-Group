import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBattle = ({ handlePopUp, handleCapture }) => {
  const navigate = useNavigate();
  const {pokemon } = location.state || "";

  const handleCaptureClick = () => {
    const enteredNickname = prompt('Enter a nickname:');
    if (enteredNickname === null || enteredNickname.trim() === '') {
      alert('Please enter a nickname for the Pokémon.');
      return;
    }

    const capturedPokemon = {
      name: pokemon.name,
      spriteUrl: pokemon.sprites.front_default,
      nickname: enteredNickname,
    };

    axios.post('/pokemon/save', capturedPokemon)
      .then(response => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error if needed
        console.error(error);
      });

    handleCapture(capturedPokemon);
    navigate('/inventory');
  };
  const handleGoBackClick = () => {
    navigate('/map');
  };


  return (
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
        onClick={handleCaptureClick}
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
  );
};

export default NavBattle;