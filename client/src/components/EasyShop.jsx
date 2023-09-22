import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useVolume } from '../hooks/useVolume';
import { useScore } from '../hooks/useScore';
import greatBall from '../img/greatBall.png';
import pokeBall from '../img/pokeBall.png';

const Shop = () => {
  const [pokeballs, setPokeballs] = useState(0);
  const [greatBalls, setGreatBalls] = useState(0);
  const { volume } = useVolume();
  const { score, setScore } = useScore();
  const {state} = useAuthContext();

  const handleBuyPokeball = () => {
    if (score >= 10) {
      axios.post('/api/pokeballs/add', { user_id: state.user.results.user.id, normal_pokeballs: 1 })
        .then(() => {
          setPokeballs((prevPokeballs) => prevPokeballs + 1);
          setScore((prevScore) => prevScore - 10);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleBuyGreatBall = () => {
    if (score >= 50) {
      axios.post('/api/pokeballs/add', { user_id: userID, great_pokeballs: 1 })
        .then(() => {
          setGreatBalls((prevGreatBalls) => prevGreatBalls + 1);
          setScore((prevScore) => prevScore - 50);
        })
        .catch((error) => console.log(error));
    }
  };

  const getPokeballs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${state.user.results.user.id}/pokeballs`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPokeballs = async () => {
      const pokeballsData = await getPokeballs();
      console.log(pokeballsData);
      if (pokeballsData) {
        setPokeballs(pokeballsData.normal_pokeballs);
        setGreatBalls(pokeballsData.great_pokeballs);
      }
    };
    fetchPokeballs();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <div className="text-2xl font-bold text-black">{`Score: ${score}`}</div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center mr-4">
          <img src={pokeBall} alt="Pokeball" className="w-8 h-8 mr-2" />
          <div className="text-lg font-bold text-black">Pokeball</div>
          <div className="text-lg font-bold text-black ml-2">{`10 Score`}</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={handleBuyPokeball}>Buy</button>
          <div className="text-lg font-bold text-black ml-2">{`x${pokeballs}`}</div>
        </div>
        <div className="flex items-center justify-center">
          <img src={greatBall} alt="Great Ball" className="w-8 h-8 mr-2" />
          <div className="text-lg font-bold text-black">Great Ball</div>
          <div className="text-lg font-bold text-black ml-2">{`50 Score`}</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={handleBuyGreatBall}>Buy</button>
          <div className="text-lg font-bold text-black ml-2">{`x${greatBalls}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
