import React, { createContext, useState } from 'react';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState("pokemon_bg1.jpg");

  const handleBackgroundChange = (value) => {
    setBackgroundImage(value);
    document.body.style.backgroundImage = `url(./background_imgs/${value})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.overflow = 'hidden';
  };
  
  const resetBg = () => {
    setBackgroundImage("");

  }

  return (
    <BackgroundContext.Provider value={{ backgroundImage, handleBackgroundChange,resetBg  }}>
      {children}
    </BackgroundContext.Provider>
  );
}