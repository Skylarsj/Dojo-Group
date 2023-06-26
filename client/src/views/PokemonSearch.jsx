import React from "react";
import { useState, useEffect } from "react";
// components
import Map from "../components/map.jsx";


const PokemonSearch = ({changeNavBar}) => {

    if(changeNavBar){
        changeNavBar(false);
    } else {
        changeNavBar(true);
    }

    return (
        <>
        <div className="w-full h-full">
            <Map/>
        </div>
        </>
)
}
export default PokemonSearch