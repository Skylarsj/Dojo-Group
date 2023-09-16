import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greatBall from '../img/greatBall.png';
import masterBall from '../img/masterBall.png';
import ultraBall from '../img/ultraBall.png';
import pokeBall from '../img/pokeBall.png';
import '../styling/PokeballSelector.css';
import { useAuthContext } from '../hooks/useAuthContext';

const PokeballSelector = ({ onChange }) => {
  const [selected, setSelected] = useState('normal'); // Set a default value of 'normal'
  const [selectedPokeball, setSelectedPokeball] = useState('normal'); // Set a default value of 'normal'
  const [pokeballs, setPokeballs] = useState([
    { id: 'normal', img: pokeBall },
    { id: 'great', img: greatBall },
    { id: 'ultra', img: ultraBall },
    { id: 'master', img: masterBall },
  ]);
  const [normalPokeballs, setNormalPokeballs] = useState(0);
  const [greatPokeballs, setGreatPokeballs] = useState(0);
  const [ultraPokeballs, setUltraPokeballs] = useState(0);
  const [masterPokeballs, setMasterPokeballs] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAuthContext();

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
        setNormalPokeballs(pokeballsData.normal_pokeballs);
        setGreatPokeballs(pokeballsData.great_pokeballs);
        setUltraPokeballs(pokeballsData.ultra_pokeballs);
        setMasterPokeballs(pokeballsData.master_pokeballs);
      }
    };
    fetchPokeballs();
  }, []);

  const handlePokeballClick = (pokeball) => {
    setSelected(pokeball.id);
    setSelectedPokeball(pokeball);
    if (onChange) {
      onChange(pokeball);
    }
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
          <p>
            {selected === 'normal'
              ? normalPokeballs
              : selected === 'great'
              ? greatPokeballs
              : selected === 'ultra'
              ? ultraPokeballs
              : selected === 'master'
              ? masterPokeballs
              : ''}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="pokeball-selector-menu">
          {pokeballs.map((pokeball) => (
            <div
              key={pokeball.id}
              className={`pokeball-selector-menu-item ${selected === pokeball.id ? 'selected' : ''}`}
              onClick={() => handlePokeballClick(pokeball)}
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