import React from 'react'
import { useState } from 'react'

const Map = () => {

    return (
        <div className="flex flex-wrap bg-cover w-[340px] h-[290px]" style={{ backgroundImage: `url('./src/img/map.png')` }}>
        {/* Upper Left */}
            <div className="w-1/3 h-1/2"/>
        {/* Upper Middle */}
            <div className="w-1/3 h-1/2"/>
        {/* Upper Right */}
            <div className="w-1/3 h-1/2"/>
        {/* Lower Left */}
            <div className="w-1/3 h-1/2"/>
        {/* Lower Middle */}
            <div className="w-1/3 h-1/2"/>
        {/* Lower Right */}
            <div className="w-1/3 h-1/2"/>
        </div>
    )
    }
export default Map