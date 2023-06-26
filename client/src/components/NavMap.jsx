import React from 'react';

const NavMap = () => {
    return(
        <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
            <img className="h-16 w-16" src="./src/img/PokemonButton.png" alt="logo"/>
            <p className="font-mono text-black text-[20px] ml-[-10px] pt-6">x</p>
            <p className="font-mono text-black text-[20px] pt-6">25</p>
        </div>
    );
}

export default NavMap;