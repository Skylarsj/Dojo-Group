import { VolumeContext } from "../context/VolumeContext";
import { useContext } from "react";

export const useVolume = () => {
  const context = useContext(VolumeContext);

  if (!context) {
    throw new Error("useVolume must be used within a VolumeProvider");
  }

  return context;
};