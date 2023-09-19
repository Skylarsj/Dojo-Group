import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import basket from "../img/basket.png";
import greatBall from '../img/greatBall.png';
import masterBall from '../img/masterBall.png';
import ultraBall from '../img/ultraBall.png';
import pokeBall from '../img/pokeBall.png';

const EarnEasy = () => {
  const [pokeballs, setPokeballs] = useState([]);
  const [basketPosition, setBasketPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const basketRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      setTimeLeft(0);
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setBasketPosition((prevPosition) => Math.max(prevPosition - 10, 0));
      } else if (event.key === 'ArrowRight') {
        const maxPosition = 280
        setBasketPosition((prevPosition) => Math.min(prevPosition + 10, maxPosition));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 4) + 1;
      let ballImage, ballPoints;

      switch (randomNum) {
        case 1:
          ballImage = pokeBall;
          ballPoints = 1;
          break;
        case 2:
          ballImage = greatBall;
          ballPoints = 3;
          break;
        case 3:
          ballImage = ultraBall;
          ballPoints = 10;
          break;
        case 4:
          ballImage = masterBall;
          ballPoints = 10;
          break;
        default:
          ballImage = pokeBall;
          ballPoints = 1;
      }

      setPokeballs((prevPokeballs) => [
        ...prevPokeballs,
        { image: ballImage, points: ballPoints },
      ]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);




  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center mb-4">
        <div className="text-2xl font-bold">{`Score: ${score}`}</div>
        <div className="text-2xl font-bold ml-4">{`Time Left: ${timeLeft}`}</div>
        <img
          src={basket}
          alt="Basket"
          className="w-16 h-16 mr-4"
          style={{ position: 'absolute', bottom: 65, left: basketPosition }}
          ref={basketRef}
        />
      </div>
      
      {gameOver && (
        <div className="text-4xl font-bold mt-8">Game Over!</div>
      )}
    </div>
  );
};

export default EarnEasy;
