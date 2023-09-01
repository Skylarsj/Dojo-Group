import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import ChangeName from './components/ChangeNickname'
import Captured from './views/Captured'
import PokedexData from './views/PokedexData'
import Navbar from './views/navbar'
import Login from './views/LogIn'
import PokemonSearch from './views/PokemonSearch'
import Battle from './views/Battle'
import Register from './views/Register'
import Inventory from './views/Inventory'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { state } = useAuthContext()

  return (
    <BrowserRouter>
      <div className="bg-cover bg-center h-[950px] w-[550px] relative" style={{ backgroundImage: `url('./src/img/pokedex.png')` }}>
        <div className="absolute flex flex-col justify-end w-[62%] h-[35.7%] top-[44.2%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <Routes>
            <Route element={state.user ? <Navigate to="/map" /> : <Login />} path="/" />

            <Route element={state.user ? <Navigate to="/map" /> : <Register />} path="/register" />

            <Route element={!state.user ? <Navigate to="/" /> : <PokemonSearch />} path="/map" />

            <Route element={!state.user ? <Navigate to="/" /> : <Inventory />} path="/inventory" />
            <Route element={!state.user ? <Navigate to="/" /> : <Battle />} path="/battle" />

            <Route element={!state.user ? <Navigate to="/" /> : <Captured />} path="/captured" />

            <Route element={!state.user ? <Navigate to="/" /> : <ChangeName />} path="/change-nickname" />
          </Routes>
          <Navbar />
        </div>
        <div className="absolute bottom-[114px] rounded left-[162px] w-[169px] h-[81px]">
          <PokedexData />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App