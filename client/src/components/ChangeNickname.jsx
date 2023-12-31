import {React,  useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangeName = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const {pokemon} = location.state || "";
    const [nickname, setNickname] = useState("");
    const [pokemonName, setPokemonName] = useState("");

    const newNickname = {
        nickname: nickname,
        id: pokemon.id
    };

   //I want to make a function that will validate that the user is logged in 
    //and if they are not logged in, redirect them to the login page
    
    const nickNameChange = () => {
            axios.post("http://localhost:5000/api/pokemon/update/nickname", newNickname)
            .then((res) => {
                console.log(res);
                Navigate('/inventory');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const applyNickname = (e) => {
        setNickname(e.target.value);
    };

    return(
        <div className="relative flex flex-col w-full h-full">
            <div className="absolute bottom-20 left-[133px]">{pokemon.name}</div>
            <img className="w-[200px] h-[200px] mx-auto" src={pokemon.sprite} alt={pokemon.name} />
            <input onChange={applyNickname} className="justify-bottom w-3/4 mx-auto" type="text" placeholder={pokemon.nickname} value={nickname} />
            <button className="justify-bottom w-3/4 mx-auto" onClick={nickNameChange}>Change Nickname</button>
        </div>
    );

    }

export default ChangeName;