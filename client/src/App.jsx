//standard imports
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
//component imports
import LogIn from './components/LogIn'


  function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<LogIn/>}path="/"/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

export default App
