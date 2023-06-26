import React from 'react';
import NavMap from '../components/NavMap';
import NavBattle from '../components/NavBattle';

const Navbar = ({ showMap, showNavBattle, showNavMap }) => {
    console.log(showNavBattle);

return (
    <div className="flex h-16 w-full bg-[#00C247] border-t-2 border-black">
    {showMap && <NavMap />}
    {showNavBattle && <NavBattle />}
    </div>
);
}

export default Navbar;