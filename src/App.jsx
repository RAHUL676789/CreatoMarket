

import React from 'react'

import './App.css'
import Singup from './components/Singup'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/Login'
import CreterHome from './Pages/CreterHome'

const App = () => {
  return (
  
    <BrowserRouter>
   
    <Routes>

    <Route  path="/Signup" element={<Singup/>}></Route>
    <Route  path="/Login" element={<Login/>}></Route>
    <Route path='/' element={  <CreterHome/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
