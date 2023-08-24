import React, { useState } from 'react';
import { useVolume } from '../hooks/useVolume';

const VolumeSlider = () => {
  const { volume, setVolume } = useVolume();
  const [tempVolume, setTempVolume] = useState(volume);

  const handleVolumeChange = (event) => {
    setTempVolume(parseFloat(event.target.value));
  };

  const handleApplyClick = () => {
    setVolume(tempVolume);
  };

  return (
    <div>
      <p>Volume: {tempVolume}</p>
      <input type="range" min="0" max="1" step="0.01" value={tempVolume} onChange={handleVolumeChange} />
      <button className="w-20 h-10 text-xs mr-2 font-mono" onClick={handleApplyClick}>Apply</button>
    </div>
  );
};

export default VolumeSlider;