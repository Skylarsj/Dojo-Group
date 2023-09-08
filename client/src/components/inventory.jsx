import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import inventoryMusic from '../music/inventoryMusic.mp3';
import VolumeSlider from './volumeSlider';
import { useVolume } from '../hooks/useVolume';
import { usePokemonContext } from '../hooks/usePokemonContext';
import { useBackground } from '../hooks/useBackground';

const Bag = () => {
  const Navigate = useNavigate();
  const [pokemonObjects, setPokemonObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { state } = useAuthContext();
  const { volume } = useVolume();
  const { releasePokemon } = usePokemonContext();
  const { backgroundImage, handleBackgroundChange } = useBackground();
  const [backgroundOptions] = useState([
    { value: 'pokemon_bg1.jpg', label: 'Pikachu' },
    { value: 'pokemon_bg2.jpg', label: 'Pokeball' },
    { value: 'pokemon_bg3.jpg', label: 'Pokemon' },
    { value: 'pokemon_bg4.jpg', label: 'Eevee' },
    { value: 'pokemon_bg5.jpg', label: 'Snorlax' },
    { value: 'pokemon_bg6.jpg', label: 'Po' },
  ]);

  console.log('background', backgroundImage);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        if (state.user) {
          const user_id = state.user.results.user.id;

          // Get user's Pokemon data
          const savePokemonResponse = await axios.get(`http://localhost:5000/api/pokemon/get-all/${user_id}`);
          console.log(savePokemonResponse);
          const pokemonData = savePokemonResponse.data;

          // Fetch details for each Pokemon
          const pokemonObjects = await Promise.all(
            pokemonData.pokemon.map(async (pokemon) => {
              return {
                name: pokemon.name,
                id: pokemon.id,
                sprite: pokemon.SpriteURL,
                nickname: pokemon.nickname,
                user_id: pokemon.user_id,
              };
            })
          );
          console.log(pokemonObjects.length);
          setPokemonObjects(pokemonObjects);
        }
      } catch (error) {
        // Handle error if the request fails
        console.error('An error occurred:', error);
      }
    };

    getPokemonData();
  }, [state.user]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
    console.log('maths', Math.ceil(pokemonObjects.length / 1) - 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    console.log(currentPage);
    console.log('maths', Math.ceil(pokemonObjects.length / 1) - 1);
  };

  const renderPokemonSprites = () => {
    if (pokemonObjects.length === 0) {
      return (
        <div className=" flex items-center justify-center h-full">
          <div className="flex-col font-mono text-black text-center">
            <p className="font-bold">No Pokemon found.</p>
            <p>Go catch some!</p>
          </div>
        </div>
      );
    }

    const startIndex = currentPage * 1;
    const endIndex = (currentPage + 1) * 1;
    return pokemonObjects
      .slice(startIndex, endIndex)
      .map((pokemonObjects, index) => (
        <li key={index}>
          <div className="flex flex-col">
            <div className="flex h-1/2">
              <img className="w-20 h-20" src={pokemonObjects.sprite} alt={`Pokemon Sprite ${index}`} />
              <div className="flex-col w-[125px] text-[10px] font-mono text-black">
                <p className="mt-2">Name:</p>
                <p>{pokemonObjects.name}</p>
                <p className="mt-1">Nickanme:</p>

                <p>{pokemonObjects.nickname}</p>
              </div>
            </div>
            <div className="flex h-1/2 items-center justify-center">
              <button onClick={() => DeletePokemon(pokemonObjects.id)} className="w-20 h-10 text-xs mr-2 font-mono">
                release
              </button>
              <button onClick={() => goToChangeNickname(pokemonObjects)} className="w-20 h-10 text-xs pl-2.5 font-mono">
                nickname
              </button>
            </div>
          </div>
        </li>
      ));
  };
  const goToChangeNickname = (pokemon) => {
    Navigate('/change-nickname', { state: { pokemon: pokemon } });
  };

  const DeletePokemon = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/pokemon/delete/${id}`)
      .then((response) => {
        releasePokemon();
        console.log(response);
        setPokemonObjects((prevPokemonObjects) => prevPokemonObjects.filter((pokemon) => pokemon.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const audio = new Audio(inventoryMusic);
    audio.volume = volume; // Set volume to 25%
    audio.loop = true; // Set loop to true
    audio.play();
    return () => {
      audio.pause();
    };
  }, [volume]);


  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-[#00C247]">
      <div className="relative flex h-1/2 w-full border mx-auto">
        <button
          className="absolute border rounded-xl w-12 h-1/2 left-1 top-9 flex items-center bg-green-500 active:bg-green-800 "
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          <img className="rotate-180" src="./src/img/arrow.png" alt="arrow" />
        </button>
        <button
          className="absolute border rounded-xl w-12 h-1/2 right-1 top-9 flex mx-auto just items-center bg-green-500 active:bg-green-800"
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(pokemonObjects.length / 1) - 1}
        >
          <img src="./src/img/arrow.png" alt="arrow" />
        </button>
        <div className="mx-auto">
          <ul className="">{renderPokemonSprites()}</ul>
        </div>
      </div>
      <div className="h-1/2 w-full bg-slate-600 flex flex-col justify-between">
        <div className="mt-2 flex justify-center items-center">
        <select value={backgroundImage} onChange={(event) => handleBackgroundChange(event.target.value)} className="mx-2 w-32 h-10 rounded-md  text-white font-mono">
            <option value="">Gray </option>
            <option value="pokemon_bg1.jpg">Pikachu</option>
            <option value="pokemon_bg2.jpg">Pokeball</option>
            <option value="pokemon_bg3.jpg">Pokemon</option>
            <option value="pokemon_bg4.jpg">Eevee</option>
            <option value="pokemon_bg5.jpg">Snorlax</option>
            <option value="pokemon_bg6.jpg">Po</option>
          </select>
        </div>
        <div className='mb-3'> 
          <VolumeSlider />
        </div>
       
      </div>
      <style>{`body { background-image: url('./img/${backgroundImage}'); }`}</style>
    </div>
  );
};

export default Bag;