import React, { createContext, useState } from 'react';

export const VolumeContext = createContext();

const volumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};

export const VolumeProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.01); // Set initial volume to 1%

  return <VolumeContext.Provider value={{ volume, setVolume }}>{children}</VolumeContext.Provider>;
};

export default VolumeContext