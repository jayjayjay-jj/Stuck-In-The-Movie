import React from 'react'
import Login from './component/Login'
import Register from './component/Register'
import Employee from './component/Employee'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './component/ProtectedRoute'

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/employee' element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

