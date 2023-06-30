import {React, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CapturedForm = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const {pokemon} = location.state || "";
    const [nickname, setNickname] = useState("");
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
            nickname: nickname || pokemon.name,
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

    const applyNickname = (e) => {
        setNickname(e.target.value);
    };

    return(
        <div className="relative flex flex-col w-full h-full">
            <div className="absolute bottom-20 left-[133px]">{pokemon.name}</div>
            <img className="w-[200px] h-[200px] mx-auto" src={pokemon.sprites.front_default} alt={pokemon.name} />
            <input onChange={applyNickname} className="justify-bottom w-3/4 mx-auto" type="text" placeholder="nickname" value={nickname} />
            <button className="justify-bottom w-3/4 mx-auto" onClick={savePokemon}>keep</button>
        </div>
    );
}

export default CapturedForm;