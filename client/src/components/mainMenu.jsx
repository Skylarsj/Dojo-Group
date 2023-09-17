import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const MainMenu = () => {
  const [bgImage, setBgImage] = useState(null);
  const { state } = useAuthContext();

  useEffect(() => {
    const bgImageOptions = [
      'mmbg1.jpg',
      'mmbg2.jpg',
      'mmbg3.jpg',
      'mmbg4.jpg',
      'mmbg5.jpg',
    ];

    const randomNum = Math.floor(Math.random() * bgImageOptions.length);
    const selectedImage = bgImageOptions[randomNum];
    setBgImage(selectedImage);
  }, []);

  return (
    <div
      className="flex flex-wrap bg-cover w-[340px] h-[290px] overflow-hidden"
      
      style={{
        backgroundImage: `url(../../public/mainMenu_imgs/${bgImage})`,
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 mt-5">Pokemon API Adventure</h1>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/map"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Map
          </Link>
          <Link
            to="/inventory"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Inventory
          </Link>
          <Link
            to="/earn-pokeballs"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Earn Pokeballs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;