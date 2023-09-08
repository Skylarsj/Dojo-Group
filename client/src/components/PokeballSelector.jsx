import React, { useState } from 'react';
import greatBall from '../img/greatBall.png';
import masterBall from '../img/masterBall.png';
import ultraBall from '../img/ultraBall.png';
import pokeBall from '../img/pokeBall.png';
import '../styling/PokeballSelector.css';

const PokeballSelector = ({ onChange }) => {
  const [selected, setSelected] = useState('pokeball');
  const [pokeballs, setPokeballs] = useState([
    { id: 'pokeball', img: pokeBall },
    { id: 'greatball', img: greatBall },
    { id: 'ultraball', img: ultraBall },
    { id: 'masterball', img: masterBall },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePokeballClick = (pokeball) => {
    setSelected(pokeball);
    onChange(pokeball);
    setIsOpen(false);
  };

  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pokeball-selector">
      <div className="pokeball-selector-nav" onClick={handleSelectorClick}>
        <div className="pokeball-selector-nav-item">
          <img src={pokeballs.find((pokeball) => pokeball.id === selected).img} alt={selected} />
        </div>
      </div>
      {isOpen && (
        <div className="pokeball-selector-menu">
          {pokeballs.map((pokeball) => (
            <div
              key={pokeball.id}
              className={`pokeball-selector-menu-item ${selected === pokeball.id ? 'selected' : ''}`}
              onClick={() => handlePokeballClick(pokeball.id)}
            >
              <img src={pokeball.img} alt={pokeball.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokeballSelector;