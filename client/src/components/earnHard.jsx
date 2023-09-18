import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import basket from "../img/basket.png";
import greatBall from '../img/greatBall.png';
import masterBall from '../img/masterBall.png';
import ultraBall from '../img/ultraBall.png';
import pokeBall from '../img/pokeBall.png';

const EarnHard = () => {
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
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setBasketPosition((prevPosition) => prevPosition - 10);
      } else if (event.key === 'ArrowRight') {
        setBasketPosition((prevPosition) => prevPosition + 10);
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

  useEffect(() => {
    const basketWidth = basketRef.current.offsetWidth;
    const basketLeft = basketRef.current.offsetLeft;
    const basketRight = basketLeft + basketWidth;

    pokeballs.forEach((ball, index) => {
      const ballElement = document.getElementById(`ball-${index}`);
      const ballTop = ballElement.offsetTop;
      const ballBottom = ballTop + ballElement.offsetHeight;
      const ballLeft = ballElement.offsetLeft;
      const ballRight = ballLeft + ballElement.offsetWidth;

      if (ballBottom >= basketRef.current.offsetTop && ballBottom <= basketRef.current.offsetTop + basketRef.current.offsetHeight) {
        if (ballLeft >= basketLeft && ballRight <= basketRight) {
          setScore((prevScore) => prevScore + ball.points);
          setPokeballs((prevPokeballs) => prevPokeballs.filter((_, i) => i !== index));
        }
      } else if (ballBottom >= window.innerHeight) {
        setPokeballs((prevPokeballs) => prevPokeballs.filter((_, i) => i !== index));
      }
    });
  }, [pokeballs, basketRef]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Earn Easy Pokeballs</h1>
      <div className="flex items-center justify-center mb-4">
        <img
          src={basket}
          alt="Basket"
          className="w-16 h-16 mr-4"
          style={{ position: 'absolute', left: basketPosition }}
          ref={basketRef}
        />
        <div className="text-2xl font-bold">{`Score: ${score}`}</div>
        <div className="text-2xl font-bold ml-4">{`Time Left: ${timeLeft}`}</div>
      </div>
      <div className="flex flex-wrap justify-center">
        {pokeballs.map((ball, index) => (
          <img
            key={index}
            src={ball.image}
            alt="Pokeball"
            className="w-16 h-16 m-2"
            id={`ball-${index}`}
          />
        ))}
      </div>
      {gameOver && (
        <div className="text-4xl font-bold mt-8">Game Over!</div>
      )}
    </div>
  );
};

export default EarnHard;