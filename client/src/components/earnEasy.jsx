import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import basket from "../img/basket.png";
import greatBall from '../img/greatBall.png';
import masterBall from '../img/masterBall.png';
import ultraBall from '../img/ultraBall.png';
import pokeBall from '../img/pokeBall.png';

const EarnEasy = () => {
  const screenHeight = 341; 
  const screenWidth = 275;
  const [pokeballs, setPokeballs] = useState([]);
  const [basketPosition, setBasketPosition] = useState(screenWidth / 2 - 8);
  const [position, setPosition] = useState(screenHeight - 275);
  const [fallingSpeed] = useState(1); 
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const basketRef = useRef(null);

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          return prevTimeLeft;
        }
      });
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
        const maxPosition = 275;
        setBasketPosition((prevPosition) => Math.min(prevPosition + 10, maxPosition));
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) {
      return;
    }
    const intervalId = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 4) + 1;
      let ballImage, ballPoints;
  
      switch (randomNum) {
        case 1:
          ballImage = pokeBall;
          ballPoints = 0.5;
          break;
        case 2:
          ballImage = greatBall;
          ballPoints = 1.5;
          break;
        case 3:
          ballImage = ultraBall;
          ballPoints = 2.5;
          break;
        case 4:
          ballImage = masterBall;
          ballPoints = 5;
          break;
        default:
          ballImage = pokeBall;
          ballPoints = 1;
      }
  
      const randomX = Math.random() * (screenWidth - 30);
      const newPokeball = {
        image: ballImage,
        points: ballPoints,
        position: 0, // start at the top of the screen
        x: randomX, // set a random x position
      };
  
      setPokeballs((prevPokeballs) => [...prevPokeballs, newPokeball]);
    }, 2000);
  
    return () => clearInterval(intervalId);
  }, [gameOver]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPokeballs((prevPokeballs) => {
        return prevPokeballs.map((pokeball) => {
          const newPosition = pokeball.position + fallingSpeed;
          return { ...pokeball, position: newPosition };
        });
      });
    }, 10);
  
    return () => clearInterval(intervalId);
  }, [fallingSpeed]);
  
  useEffect(() => {
    setPokeballs((prevPokeballs) => {
      return prevPokeballs.filter((pokeball) => {
        return pokeball.position < 245;
      });
    });
  }, [pokeballs]);

  useEffect(() => {
    setPokeballs((prevPokeballs) => {
      return prevPokeballs.filter((pokeball) => {
        const basketRect = {
          x: basketPosition,
          y: position,
          width: 100,
          height: 70,
        }
        console.log("basket", basketRect);
        const pokeballRect = {
          x: pokeball.x,
          y: screenHeight - pokeball.position - 8, // Adjusted position
          width: 8,
          height: 8,
        };
        console.log("pokeball", pokeballRect);
        if (intersectRect(basketRect, pokeballRect)) {
          console.log('Pokeball collided with basket!');
          setScore((prevScore) => prevScore + pokeball.points);
          return false;
        } else {
          return true;
        }
      });
    });
  }, [position, pokeballs]);



 

  const intersectRect = (r1, r2) => {
    return !(r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y);
  };

  return (
    <div>
      <div>{gameOver && (
        <div className="text-4xl font-bold mt-0 text-red-500 border-4 border-red-500 bg-black">Game Over!</div>
      )}</div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="text-2xl font-bold text-black">{`Score: ${score}`}</div>
        <div className="text-2xl font-bold ml-4 text-black">{`Time Left: ${timeLeft}`}</div>
      </div>
      <img
        src={basket}
        alt="Basket"
        className="w-15 h-16 mr-4"
        style={{ position: 'absolute', bottom: position , left: basketPosition }}
        ref={basketRef}
      />
      {pokeballs.map((pokeball, index) => (
        <img
        key={index}
        src={pokeball.image}
        alt="Pokeball"
        className="w-8 h-8 absolute"
        style={{ top: `${pokeball.position}px`, left: `${pokeball.x}px` }}
      />
      ))}
    </div>
  );
};

export default EarnEasy;
