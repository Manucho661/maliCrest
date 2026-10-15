import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'

// auth
import Login from './pages/auth/Login'

// admin
import Dashboard from './pages/admin/Dashboard'

// tenant
import TenantDashboard from './pages/tenant/Dashboard'

// property user
import PropertyUserDashboard from './pages/propertyUser/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        {/* tenant */}
        <Route path="/tenant" element={<TenantDashboard />} />
        {/* property user */}
        <Route path="/property-user" element={<PropertyUserDashboard />} />
        {/* Redirect unknown URLs to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
