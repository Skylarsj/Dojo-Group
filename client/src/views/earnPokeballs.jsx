import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";  
import { useAuthContext } from "../hooks/useAuthContext";
import EarnSelect from "../components/earnSelect";
import EarnEasy from "../components/earnEasy";
import EarnMedium from "../components/earnMedium";
import EarnHard from "../components/earnHard";

const EarnPokeballs = () => {
  const [gameMode, setGameMode] = useState("select");

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
  };

  return (
    <div className="w-full h-full">
      {gameMode === "select" && <EarnSelect onGameModeChange={handleGameModeChange} />}
      {gameMode === "easy" && <EarnEasy onGameModeChange={handleGameModeChange} />}
      {gameMode === "medium" && <EarnMedium onGameModeChange={handleGameModeChange} />}
      {gameMode === "hard" && <EarnHard onGameModeChange={handleGameModeChange} />}
    </div>
  );
};

export default EarnPokeballs;
    



  