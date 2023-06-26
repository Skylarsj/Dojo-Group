import React from 'react';
import NavMap from '../components/NavMap';
import NavBattle from '../components/NavBattle';

const Navbar = ({ showNavMap, showNavBattle }) => {
    console.log(showNavMap);
return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
    {showNavMap && <NavMap />}
    {showNavBattle && <NavBattle />}
    </div>
);
}

export default Navbar;