

import React from 'react'

import './App.css'
import Singup from './components/Singup'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/Login'
import CreterHome from './Pages/CreterHome'
import toast, { Toaster } from 'react-hot-toast';
import Contents from './Pages/Contents'
import UnsplashGrid from './Pages/Home'
import Payment from './components/Payment'

const App = () => {
  return (
  
    <BrowserRouter>
   <Toaster/>
    <Routes>

    <Route  path="/Signup" element={<Singup/>}></Route>
    <Route  path="/Login" element={<Login/>}></Route>
    <Route path='/' element={  <CreterHome/>}></Route>
    <Route path='/contents' element={  <Contents/>}></Route>
    <Route path='/Home' element={  <UnsplashGrid/>}></Route>
    <Route path='/Payment' element={  <Payment/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
