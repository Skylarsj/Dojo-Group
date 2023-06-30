import {React, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CapturedForm = () => {
    const location = useLocation();
    const {pokemon} = location.state || "";
    console.log(pokemon);

    
    const savePokemon = async () => {
        try {
        const loginCheckResponse = await axios.get('http://127.0.0.1:5000/api/check-login', { withCredentials: true });
        const loginCheckData = loginCheckResponse.data;
    
        console.log(loginCheckData);
    
        if (loginCheckData.logged_in) {
                const user_id = loginCheckData.user_id;
            const capturedPokemon = {
            user_id: user_id,
            name: pokemon.name,
            nickname: pokemon.name,
            spriteURL: pokemon.sprites.front_default
            };
    
            const savePokemonResponse = await axios.post("http://localhost:5000/api/pokemon/save", capturedPokemon, { withCredentials: true });
            console.log(savePokemonResponse);
    
            Navigate('/map');
        } else {
            // User is not logged in, redirect to login page or perform other actions
            Navigate("/");
            console.log("User is not logged in");
        }
        } catch (error) {
        // Handle error if the request fails
        console.error("An error occurred:", error);
        }
    };


    return(
        <div className="flex w-full h-full">
            <div>{pokemon.name}</div>
            <button onClick={savePokemon}>Save</button>
        </div>
    );
}

export default CapturedForm;