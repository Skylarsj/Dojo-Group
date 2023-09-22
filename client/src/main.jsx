import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { VolumeProvider } from './context/VolumeContext.jsx'
import { PokemonProvider } from './context/pokemonContext.jsx'
import { BackgroundProvider } from './context/Background.jsx'
import { CaptureStatusProvider } from './context/CaptureStatusContext.jsx'
import { ScoreProvider } from './context/ScoreContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BackgroundProvider>
        <VolumeProvider>
          <PokemonProvider> 
            <CaptureStatusProvider> 
              <ScoreProvider> 
                <App />
              </ScoreProvider>
            </CaptureStatusProvider>
          </PokemonProvider>
        </VolumeProvider>
      </BackgroundProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
