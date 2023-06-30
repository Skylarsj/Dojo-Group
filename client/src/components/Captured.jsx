import {React, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CapturedForm = () => {
    const location = useLocation();
    const {pokemon} = location.state || "";
    console.log(pokemon);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/check-login', { withCredentials: true })
            .then(response => response.data)
            .then(data => {
                console.log(data);
            if (data.logged_in) {
                // User is logged in, perform necessary actions
                console.log("Logged in as:", data.username);
            } else {
                // User is not logged in, redirect to login page or perform other actions
                Navigate("/");
                console.log("User is not logged in");
            }
            })
            .catch(error => {
            // Handle error if the request fails
            console.error("An error occurred:", error);
            });
        }, []);
    
    const savePokemon = () => {


    const capturedPokemon = {
            name: pokemon.name,
            nickname: pokemon.name,
            spriteURL: pokemon.sprites.front_default
        }

        axios.post("http://localhost:5000/api/pokemon/save", capturedPokemon, { withCredentials: true })
            .then(res => {
                console.log(res);
                Navigate('/map');
            })
            .catch(err => console.log(err));
    }


    return(
        <div className="flex w-full h-full">
            <div>{pokemon.name}</div>
            <button onClick={savePokemon}>Save</button>
        </div>
    );
}

export default CapturedForm;