import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";  
import { useAuthContext } from "../hooks/useAuthContext";
import EasyShop from "../components/EasyShop";
import MediumShop from "../components/MediumShop";
import HardShop from "../components/HardShop";

const Shops = () => {
  const [easyShop, setEasyShop] = useState(true);
  const [mediumShop, setMediumShop] = useState(false);
  const [hardShop, setHardShop] = useState(false);
  const { state } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/easyShop") {
      setEasyShop(true);
      setMediumShop(false);
      setHardShop(false);
    } else if (location.pathname === "/mediumShop") {
      setEasyShop(false);
      setMediumShop(true);
      setHardShop(false);
    } else if (location.pathname === "/hardShop") {
      setEasyShop(false);
      setMediumShop(false);
      setHardShop(true);
    }
  }, [location.pathname, state.user]);

  return (
    <div className="w-full h-full" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
      {easyShop && <EasyShop />}
      {mediumShop && <MediumShop />}
      {hardShop && <HardShop />}
    </div>
  );
};

export default Shops;