import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";  
import { useAuthContext } from "../hooks/useAuthContext";
import EarnSelect from "../components/EarnSelect";
import EarnEasy from "../components/EarnEasy"; 
import EarnMedium from "../components/EarnMedium";
import EarnHard from "../components/EarnHard";
import Charmander from '../../public/mainMenu_imgs/Charmander.gif'
import Charmeleon from '../../public/mainMenu_imgs/Charmeleon.gif'
import Charizard from '../../public/mainMenu_imgs/Charizard.gif'  

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

  let backgroundImg;
  if (earnEasy) {
    backgroundImg = Charmander;
  } else if (earnMedium) {
    backgroundImg = Charmeleon;
  } else if (earnHard) {
    backgroundImg = Charizard;
  } else {
    backgroundImg = Charmander;
  }

  return (
    <div className="w-full h-full" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
      {earnSelect  && <EarnSelect />}
      {earnEasy  && <EarnEasy  />}
      {earnMedium && <EarnMedium  />}
      {earnHard&& <EarnHard  />}
    </div>
  );
};
export default EarnPokeballs;