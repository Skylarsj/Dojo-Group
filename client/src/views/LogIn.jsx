import React from "react";
import { useState, useEffect } from "react";
// components
import LogIn from "../components/LogIn.jsx";


const BattlePokemon = () => {

    return (
        <>
        <div className="flex flex-col w-full h-full items-center justify-center">
            <img className="w-[300px] h-auto py-14" src="./src/img/PokeAPI.png" alt="Logo"/>
            <LogIn/>
        </div>
        </>
)
}
export default BattlePokemon