import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";  
import { useAuthContext } from "../hooks/useAuthContext";
import EarnSelect from "../components/EarnSelect";
import EarnEasy from "../components/EarnEasy"; 
import EarnMedium from "../components/EarnMedium";
import EarnHard from "../components/EarnHard";
import pokemon_catch from '../../public/background_imgs/pokemon_catch.jpg'

const EarnPokeballs = ({ userID }) => {
  const [earnSelect, setEarnSelect] = useState(true);
  const [earnEasy, setEarnEasy] = useState(false);
  const [earnMedium, setEarnMedium] = useState(false);
  const [earnHard, setEarnHard] = useState(false);
  const { state } = useAuthContext();
  const [pokemonCount, setPokemonCount] = useState(0);
  const location = useLocation();


  
  useEffect(() => {
    if (location.pathname === "/earnSelect") {
      setEarnSelect(true);
      setEarnEasy(false);
      setEarnMedium(false);
      setEarnHard(false);
    } else if (location.pathname === "/earnEasy") {
      setEarnSelect(false);
      setEarnEasy(true);
      setEarnMedium(false);
      setEarnHard(false);
    } else if (location.pathname === "/earnMedium") {
      setEarnSelect(false);
      setEarnEasy(false);
      setEarnMedium(true);
      setEarnHard(false);
    } else if (location.pathname === "/earnHard") {
      setEarnSelect(false);
      setEarnEasy(false);
      setEarnMedium(false);
      setEarnHard(true);
    }
  }, [location.pathname, state.user]);

  return (
    <>
        <div className="w-full h-full" style={{ backgroundImage: `url(${pokemon_catch})`, backgroundSize: 'cover' }}>
      {earnSelect  && <EarnSelect />}
      {earnEasy  && <EarnEasy screenWidth={window.innerWidth} screenHeight={window.innerHeight} />}
      {earnMedium && <EarnMedium screenWidth={window.innerWidth} screenHeight={window.innerHeight} />}
      {earnHard&& <EarnHard screenWidth={window.innerWidth} screenHeight={window.innerHeight} />}
    </div>
    </>
  );
};
export default EarnPokeballs;
    



  