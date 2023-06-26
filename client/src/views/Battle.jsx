import React from "react";
import { useState, useEffect } from "react";
import battleMusic from "../music/battle.mp3";
// components
import Battle from "../components/Battle.jsx";


const BattlePokemon = () => {

    return (
        <>
        <audio autoPlay>
            <source src={battleMusic} type="audio/mpeg" />
        </audio>
        <div className="w-full h-full">
            <Battle/>
        </div>
        </>
)
}
export default BattlePokemon