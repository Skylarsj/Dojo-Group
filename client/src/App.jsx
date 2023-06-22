//standard imports
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
//component imports
import LogIn from './components/LogIn'


function App() {
  return (
    <div className="bg-cover bg-center h-[950px] w-[550px] relative" style={{ backgroundImage: `url('./src/img/original-42f52449520e8e7940c668566888d84f.png')` }}>
      <div className="absolute w-[61.5%] h-[35.7%] top-[44.2%] left-[52%] transform -translate-x-1/2 -translate-y-1/2">
        <BrowserRouter>
          <Routes>
            <Route element={<LogIn />} path="/" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App
