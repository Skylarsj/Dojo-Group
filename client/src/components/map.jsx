import React from 'react'
import { useState } from 'react'

const Map = () => {

    return (
        <div className="flex flex-wrap bg-cover w-[340px] h-[290px]" style={{ backgroundImage: `url('./src/img/map.png')` }}>
        {/* Upper Left */}
            <div className="border w-1/3 h-1/2"/>
        {/* Upper Middle */}
            <div className="border w-1/3 h-1/2"/>
        {/* Upper Right */}
            <div className="border w-1/3 h-1/2"/>
        {/* Lower Left */}
            <div className="border w-1/3 h-1/2"/>
        {/* Lower Middle */}
            <div className="border w-1/3 h-1/2"/>
        {/* Lower Right */}
            <div className="border w-1/3 h-1/2"/>
        </div>
    )
    }
export default Map