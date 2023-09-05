import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import NavMap from '../components/NavMap';
import NavBattle from '../components/NavBattle';
import NavInventory from '../components/navInventory';
import NavCaptured from '../components/NavCaptured';

const Navbar = ({ userID }) => {
  const [navMap, setNavMap] = useState(true);
  const [navBattle, setNavBattle] = useState(false);
  const [navCaptured, setNavCaptured] = useState(false);
  const [navInventory, setNavInventory] = useState(false);
  const {state} = useAuthContext();
  const [pokemonCount, setPokemonCount] = useState(0);
  const location = useLocation();
  const [pokeballCount, setPokeballCount] = useState(0);

  const DeletePokemon = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/pokemon/delete/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setPokemonObjects((prevPokemonObjects) => prevPokemonObjects.filter(pokemon => pokemon.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
  

    if (location.pathname === '/map') {
      setNavMap(true);
      setNavBattle(false);
      setNavCaptured(false);
      setNavInventory(false);
    } else if (location.pathname === '/battle') {
      setNavMap(false);
      setNavBattle(true);
      setNavCaptured(false);
      setNavInventory(false);
    } else if (location.pathname === '/captured') {
      setNavMap(false);
      setNavBattle(false);
      setNavCaptured(true);
      setNavInventory(false);
    } else if (location.pathname === '/inventory') {
      setNavMap(false);
      setNavBattle(false);
      setNavCaptured(false);
      setNavInventory(true);
    }
    else if (location.pathname === '/register' || location.pathname === '/') {
        setNavMap(false);
        setNavBattle(false);
        setNavCaptured(false);
        setNavInventory(false);
      }
    
    
  

    
  }, [location.pathname, state.user]);

  return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
      {navBattle  && <NavBattle />}
      {navMap && <NavMap />}
      {navCaptured && <NavCaptured DeletePokemon={DeletePokemon} />}
      {navInventory && <NavInventory setNavInventory={setNavInventory} pokeballCount={pokeballCount} />}
    </div>
  );
};

export default Navbar;