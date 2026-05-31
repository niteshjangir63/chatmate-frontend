import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from './pages/Reset'
import Home from './pages/Home'

function App() {


  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/reset-password' element={<Reset/>}/>

    </Routes>
    
    </>
  )
}

export default App
