import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Battle = ({pokemon}) => {

    return(
        <div className="flex flex-wrap bg-cover w-[340px] h-[290px]" style={{ backgroundImage: `url(${pokemon.sprites.front_default})`}}/>
    )
}

export default Battle;