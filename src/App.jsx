import React from 'react'
import Navbar from './pages/navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import SubmitRequest from './pages/Citizen/submitRequest'
import AdminHome from './pages/Admin/adminHome'
import OperatorHome from './pages/Operator/operatorHome'
import AdminDashboard from './pages/Admin/adminDashboard'
import AdminAnalytics from './pages/Admin/adminAnalytics'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import { useAuth } from './userContext/AuthContext'

const App = () => {

  const { isLoggedIn } = useAuth()

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      )
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      )
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      )
    },
    {
      path: "/submitRequest",
      element: isLoggedIn ? (
        <>
          <Navbar />
          <SubmitRequest />
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/adminHome",
      element: (
        <>
          <Navbar />
          <AdminHome />
        </>
      )
    },
    {
      path: "/operatorHome",
      element: (
        <>
        <Navbar/>
        <OperatorHome/>
        </>
      )
    },{
      path : "/adminDashboard",
      element: (
        <>
        <Navbar/>
        <AdminDashboard/>
        </>
      )
    },
    {
      path : "/adminAnalytics",
      element: (
        <>
        <Navbar/>
        <AdminAnalytics/>
        </>
      )
    }

  ])

  return <RouterProvider router={router} />
}

export default App
