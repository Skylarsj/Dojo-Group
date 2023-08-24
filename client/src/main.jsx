import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { VolumeProvider } from './context/VolumeContext.jsx'
import { PokemonProvider } from './context/pokemonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <VolumeProvider>
        <PokemonProvider>
          <App />
        </PokemonProvider>
      </VolumeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
