import React, { useState } from 'react'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import SubmitRequest from './pages/Citizen/submitRequest'
import { createBrowserRouter, RouterProvider ,Navigate} from 'react-router-dom'
import AdminHome from './pages/Admin/adminHome'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <div>
          <Navbar />
          <Home />
        </div>
    },
    {
      path: '/register',
      element:
        <div>
          <Navbar />
          <Register />
        </div>
    },
    {
      path: '/login',
      element:
        <div>
          <Navbar />
          <Login onLogin={handleLoginSuccess} />
        </div>
    },
    {
      path: '/submit',
      element:
        isLoggedIn ? (
          <div>
            <Navbar />
            <SubmitRequest />
          </div>
        ) : (
          <Navigate to="/login" replace />
        )
    }, {
      path: '/adminHome',
      element:
        <div>
          <Navbar />
          <Home />
          <AdminHome />
        </div>

    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
