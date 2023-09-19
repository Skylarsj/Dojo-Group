import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import NavMap from '../components/NavMap';
import NavBattle from '../components/NavBattle';
import NavInventory from '../components/navInventory';
import NavCaptured from '../components/NavCaptured';
import NavStarter from '../components/NavStarter';
import NavMenu from '../components/NavMenu';
import NavEarn from '../components/NavEarn';

const Navbar = ({ userID }) => {
  const [navMap, setNavMap] = useState(true);
  const [navBattle, setNavBattle] = useState(false);
  const [navCaptured, setNavCaptured] = useState(false);
  const [navInventory, setNavInventory] = useState(false);
  const [navStarter, setNavStarter] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const [navEarn, setNavEarn] = useState(false);
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
      setNavStarter(false);
      setNavMenu(false);
      setNavEarn(false);
    } else if (location.pathname === '/battle') {
      setNavMap(false);
      setNavBattle(true);
      setNavCaptured(false);
      setNavInventory(false);
      setNavStarter(false);
      setNavMenu(false);
      setNavEarn(false);
    } else if (location.pathname === '/captured') {
      setNavMap(false);
      setNavBattle(false);
      setNavCaptured(true);
      setNavInventory(false);
      setNavStarter(false);
      setNavMenu(false);
      setNavEarn(false);
    } else if (location.pathname === '/inventory') {
      setNavMap(false);
      setNavBattle(false);
      setNavCaptured(false);
      setNavInventory(true);
      setNavStarter(false);
      setNavMenu(false);
      setNavEarn(false);
    }
    else if (location.pathname === '/register' || location.pathname === '/') {
        setNavMap(false);
        setNavBattle(false);
        setNavCaptured(false);
        setNavInventory(false);
        setNavStarter(false);
        setNavMenu(false);
        setNavEarn(false);
      }
    else if (location.pathname === '/starter') {
        setNavMap(false);
        setNavBattle(false);
        setNavCaptured(false);
        setNavInventory(false);
        setNavStarter(true);
        setNavMenu(false);
        setNavEarn(false);
      }
    else if (location.pathname === '/main-menu') {
        setNavMap(false);
        setNavBattle(false);
        setNavCaptured(false);
        setNavInventory(false);
        setNavStarter(false);
        setNavMenu(true);
        setNavEarn(false);
      }
    else if (location.pathname === '/earnSelect' || location.pathname === '/earnEasy' || location.pathname === '/earnMedium' || location.pathname === '/earnHard') {
        setNavMap(false);
        setNavBattle(false);
        setNavCaptured(false);
        setNavInventory(false);
        setNavStarter(false);
        setNavMenu(false);
        setNavEarn(true);
      }
    
    
  }, [location.pathname, state.user]);

  return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black"> 
      {navStarter && <NavStarter />}
      {navBattle  && <NavBattle />}
      {navMap && <NavMap />}
      {navCaptured && <NavCaptured DeletePokemon={DeletePokemon} />}
      {navInventory && <NavInventory setNavInventory={setNavInventory} pokeballCount={pokeballCount} />}
      {navMenu && <NavMenu />}
      {navEarn && <NavEarn />}
    </div>
   
  );
};

export default Navbar;