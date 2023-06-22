//standard imports
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
//component imports
import LogIn from './components/LogIn'
//view imports
import PokemonSearch from './views/PokemonSearch'

function App() {
  return (
    <div className="bg-cover bg-center h-[950px] w-[550px] relative" style={{ backgroundImage: `url('./src/img/pokedex.png')` }}>
      <div className="absolute flex flex-col justify-end w-[61.5%] h-[35.7%] top-[44.2%] left-[52%] transform -translate-x-1/2 -translate-y-1/2">
        <BrowserRouter>
          <Routes>
            <Route element={<LogIn />} path="/"/>
            <Route element={<PokemonSearch />} path="/map"/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App
