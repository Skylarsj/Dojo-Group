import { useState } from 'react'
import './App.css'
import pokedex from './img/original-42f52449520e8e7940c668566888d84f.png'
  function App() {
    return (
      <>
        <div className="w-[700px] h-[580px] bg-blend-color-dodge" style={{ backgroundImage: `url(${pokedex})`}}></div>
      </>
    );
  }

export default App
