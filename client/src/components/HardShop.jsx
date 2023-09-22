import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useVolume } from '../hooks/useVolume';
import { useScore } from '../hooks/useScore';
import greatBall from '../img/greatBall.png';
import pokeBall from '../img/pokeBall.png';
import ultraBall from '../img/ultraBall.png';
import masterBall from '../img/masterBall.png';
import axios from 'axios';
import mapMusic from '../music/mapMusic.mp3';



const Shop = () => {
  const [pokeballs, setPokeballs] = useState(0);
  const [greatBalls, setGreatBalls] = useState(0);
  const [ultraBalls, setUltraBalls] = useState(0);
  const [masterBalls, setMasterBalls] = useState(0);
  const { volume } = useVolume();
  const { score, setScore } = useScore();
  const {state} = useAuthContext();

  useEffect(() => {
    const audio = new Audio(mapMusic);
    audio.volume = volume;
    audio.loop = true; 
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  const handleBuyPokeball = () => {
    if (score >= 50) {
      axios.post('http://localhost:5000/api/pokeballs/add', { user_id: state.user.results.user.id, normal_pokeballs: 1, great_pokeballs: 0, ultra_pokeballs: 0, master_pokeballs: 0 })
     
        .then(() => {
          setPokeballs((prevPokeballs) => prevPokeballs + 1);
          setScore((prevScore) => prevScore - 50);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleBuyGreatBall = () => {
    if (score >= 75) {
      axios.post('/api/pokeballs/add', { user_id: userID, great_pokeballs: 1 })
        .then(() => {
          setGreatBalls((prevGreatBalls) => prevGreatBalls + 1);
          setScore((prevScore) => prevScore - 75);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleBuyUltraBall = () => {
    if (score >= 100) {
      axios.post('http://localhost:5000/api/pokeballs/add', { user_id: state.user.results.user.id, normal_pokeballs: 0, great_pokeballs: 0, ultra_pokeballs: 1, master_pokeballs: 0 })
        .then(() => {
          setUltraBalls((prevUltraBalls) => prevUltraBalls + 1);
          setScore((prevScore) => prevScore - 100);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleBuyMasterBall = () => {
    if (score >= 200) {
      axios.post('http://localhost:5000/api/pokeballs/add', { user_id: state.user.results.user.id, normal_pokeballs: 0, great_pokeballs: 0, ultra_pokeballs: 0, master_pokeballs: 1 })
        .then(() => {
          setMasterBalls((prevMasterBalls) => prevMasterBalls + 1);
          setScore((prevScore) => prevScore - 200);
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
        setUltraBalls(pokeballsData.ultra_pokeballs);
        setMasterBalls(pokeballsData.master_pokeballs);
      }
    };
    fetchPokeballs();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 2px #000' }}>{`Score: ${score}`}</div>
  
        <div className="grid grid-cols-4 gap-4">
          {/* Pokeball */}
          <div className="box">
            <img src={pokeBall} alt="Pokeball" className="w-10 h-10 ml-4" />
            <div className="text-lg font-bold text-red-500" style={{ textShadow: '2px 2px 2px #000' }}>Pokeball</div>
            <div className="text-lg font-bold text-White ml-2 mt-5" style={{ textShadow: '2px 2px 2px #000' }}>{`50 Score`}</div>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-3 mt-" onClick={handleBuyPokeball}>Buy</button>
            <div className="text-lg font-bold text-red-500 ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`x${pokeballs}`}</div>
          </div>
  
          {/* Great Ball */}
          <div className="box">
            <img src={greatBall} alt="Great Ball" className="w-8 h-8 ml-5" />
            <div className="text-lg font-bold text-blue-500" style={{ textShadow: '2px 2px 2px #000' }}>Great Ball</div>
            <div className="text-lg font-bold text-White ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`100 Score`}</div>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-3" onClick={handleBuyGreatBall}>Buy</button>
            <div className="text-lg font-bold text-blue-500 ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`x${greatBalls}`}</div>
          </div>
  
          {/* Ultra Ball */}
          <div className="box">
            <img src={ultraBall} alt="Ultra Ball" className="w-8 h-8 ml-5" />
            <div className="text-lg font-bold text-yellow-500" style={{ textShadow: '2px 2px 2px #000' }}>Ultra Ball</div>
            <div className="text-lg font-bold text-White ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`150 Score`}</div>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-4" onClick={handleBuyUltraBall}>Buy</button>
            <div className="text-lg font-bold text-yellow-500 ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`x${ultraBalls}`}</div>
          </div>
  
          {/* Master Ball */}
          <div className="box">
            <img src={masterBall} alt="Master Ball" className="w-8 h-8 ml-5" />
            <div className="text-lg font-bold text-purple-500" style={{ textShadow: '2px 2px 2px #000' }}>Master Ball</div>
            <div className="text-lg font-bold text-White ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`200 Score`}</div>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-" onClick={handleBuyMasterBall}>Buy</button>
            <div className="text-lg font-bold text-green-500 ml-2" style={{ textShadow: '2px 2px 2px #000' }}>{`x${masterBalls}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Shop;
