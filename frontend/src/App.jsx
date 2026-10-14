import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'

// auth
import Login from './pages/auth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
    

        {/* Redirect unknown URLs to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
