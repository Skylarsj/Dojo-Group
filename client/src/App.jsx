//standard imports
import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
//component imports
import Navbar from './views/navbar'
import PokedexData from './views/PokedexData'
//view imports
import Login from './views/LogIn'
import PokemonSearch from './views/PokemonSearch'
import Battle from './views/Battle'
import Register from './views/Register'
import Captured from './components/Captured'

function App() {

  const [navMap, setNavMap] = useState({});
  const [navBattle, setNavBattle] = useState({});
  const [navCaptured, setNavCaptured] = useState({});


  const Nav = () => {
    const location = window.location.pathname
  }
  return (
    //Pokedex
    <div className="bg-cover bg-center h-[950px] w-[550px] relative" style={{ backgroundImage: `url('./src/img/pokedex.png')` }}>
    {/* Logic for pokedex screen */}
      <div className="absolute flex flex-col justify-end w-[62%] h-[35.7%] top-[44.2%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
    {/* This is where the different views will go for the pokedex */}
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/"/>
            <Route element={<Register />} path="/register"/>
            <Route element={<PokemonSearch/>} path="/map"/>
            <Route element={<Battle />} path="/battle"/>
            <Route element={<Captured />} path="/captured"/>
          </Routes>
        </BrowserRouter>
      <Navbar/>
      </div>
    <div className="absolute bottom-[114px] rounded left-[162px] w-[169px] h-[81px]">
      <PokedexData />
    </div>
    </div>
  );
}

export default App
