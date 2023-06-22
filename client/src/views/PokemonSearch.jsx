import React from "react";
import { useState } from "react";
// components
import Map from "../components/map.jsx";
import Navbar from "../components/navbar.jsx";

const PokemonSearch = () => {
    return (
        <div className=" w-full h-full">
            <Map/>
            <Navbar/>
        </div>
)
}
export default PokemonSearch