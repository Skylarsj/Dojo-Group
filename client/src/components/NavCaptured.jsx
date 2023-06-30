import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavCaptured = () => {
    const Navigate = useNavigate();

    const Map = () => {
        Navigate('/map');
    }

    const logOut = () => {
        axios.get('http://localhost:5000/api/logout', { withCredentials: true })
            .then(res => {
                console.log(res);
                Navigate('/');
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
            {/* Pokemon count */}
            <img className="h-16 w-16" src="./src/img/PokemonButton.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">25</p>
            {/* Pokeball count */}
            <img className="h-20 w-auto pb-6" src="./src/img/NormalPokeball.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">1</p>
            <button onClick={Map} className="w-20 border border-black h-auto m-4 p-1 text-xs font-mono text-black bg-[#00C247]">map</button>
            <button onClick={logOut} className="w-16 border border-black h-auto m-4 ml-auto p-1 text-xs font-mono text-black bg-[#00C247]">Logout</button>
        </div>
    );
}

export default NavCaptured;