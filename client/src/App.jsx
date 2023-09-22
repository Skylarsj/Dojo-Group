import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import ChangeName from './components/ChangeNickname';
import Captured from './views/Captured';
import PokedexData from './views/PokedexData';
import Navbar from './views/navbar';
import Login from './views/LogIn';
import PokemonSearch from './views/PokemonSearch';
import Battle from './views/Battle';
import Register from './views/Register';
import Inventory from './views/Inventory';
import Starter from './views/Starter';
import Menu from './views/Menu';
import { useAuthContext } from './hooks/useAuthContext';
import { usePokemonContext } from './hooks/usePokemonContext';
import MainMenu from './components/mainMenu';
import EarnPokeballs from './views/earnPokeballs';
import Shops from './views/Shops';


function App() {
  const { state } = useAuthContext();
  const { isPokemonCountZero } = usePokemonContext();
  console.log("poke", isPokemonCountZero );

 

  const handleBagBackgroundChange = (value) => {
    handleBackgroundChange(value);
  };
 
  return (
    <BrowserRouter>
      <div className="bg-cover bg-center h-[950px] w-[550px] relative" style={{ backgroundImage: `url('./src/img/pokedex_noBg.png')` }}>
        <div className="absolute flex flex-col justify-end w-[62%] h-[35.7%] top-[44.2%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <Routes>
            <Route element={state.user ? <Navigate to="/main-menu" /> : <Login />} path="/" />
            <Route element={state.user ? <Navigate to="/starter" /> : <Register />} path="/register" />
            <Route element={!state.user ? <Navigate to="/" /> : <PokemonSearch />} path="/map" />
            <Route element={!state.user ? <Navigate to="/" /> : <Inventory onBackgroundChange={handleBagBackgroundChange} />} path="/inventory" />
            <Route element={!state.user ? <Navigate to="/" /> : <Battle />} path="/battle" />
            <Route element={!state.user ? <Navigate to="/" /> : <Captured />} path="/captured" />
            <Route element={!state.user ? <Navigate to="/" /> : <ChangeName />} path="/change-nickname" />
            <Route element={!state.user ? <Navigate to="/" /> : <Starter />} path="/starter" />
            <Route element={!state.user ? <Navigate to="/" /> : <Menu />} path="/main-menu" />
            <Route element={!state.user ? <Navigate to="/" /> : <EarnPokeballs />} path="/earnSelect" />
            <Route element={!state.user ? <Navigate to="/" /> : <EarnPokeballs />} path="/earnEasy" />
            <Route element={!state.user ? <Navigate to="/" /> : <EarnPokeballs />} path="/earnMedium" />
            <Route element={!state.user ? <Navigate to="/" /> : <EarnPokeballs />} path="/earnHard" />
            <Route element={!state.user ? <Navigate to="/" /> : <Shops />} path="/easyShop" />
            <Route element={!state.user ? <Navigate to="/" /> : <Shops />} path="/mediumShop" />
            <Route element={!state.user ? <Navigate to="/" /> : <Shops />} path="/hardShop" />
          </Routes>
          <Navbar />
        </div>
        <div className="absolute bottom-[114px] rounded left-[162px] w-[169px] h-[81px]">
          <PokedexData />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;