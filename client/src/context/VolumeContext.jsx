import React, { createContext, useState } from 'react';

export const VolumeContext = createContext();

export const VolumeProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.01); // Set initial volume to 1

  return <VolumeContext.Provider value={{ volume, setVolume }}>{children}</VolumeContext.Provider>;
};

export default VolumeContext;