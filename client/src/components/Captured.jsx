import {React, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"

const CapturedForm = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const { pokemon } = location.state || "";
    const [nickname, setNickname] = useState("");
    const { state } = useAuthContext();
    console.log(pokemon);
    console.log("capture", state.user.results.user.id);
  
    const savePokemon = async () => {
      try {
        if (state.user) {
          const capturedPokemon = {
            user_id: state.user.results.user.id,
            name: pokemon.name,
            nickname: nickname || pokemon.name,
            spriteURL: pokemon.sprites.front_default
          };
  
          const savePokemonResponse = await axios.post("http://localhost:5000/api/pokemon/save", capturedPokemon);
          Navigate('/map');
        } else {
          console.log("User is not logged in");
        }
      } catch (error) {
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