import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBattle = () => {
    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black z-50">
            {/* Pokeball count */}
            <img className="h-20 w-auto pb-6" src="./src/img/NormalPokeball.png" alt="logo"/>
                <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
                <p className="font-mono text-black text-[20px] pt-6">1</p>
            <div className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]">Capture!</div>
            <div className="w-18 border rounded-md border-black h-auto m-4 ml-auto text-xs p-1.5 font-mono text-black bg-[#00C247]">Go back</div>
        </div>
    );
}

export default NavBattle;