import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { VolumeProvider } from './context/VolumeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <VolumeProvider>
        <App />
      </VolumeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
