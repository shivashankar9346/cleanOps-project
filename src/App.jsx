import React from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SubmitRequest from "./pages/Citizen/submitRequest";
import AdminHome from "./pages/Admin/adminHome";
import OperatorHome from "./pages/Operator/operatorHome";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminAnalytics from "./pages/Admin/adminAnalytics";

import CommunityList from "./pages/Community/communityList";
import CommunityDetails from "./pages/Community/communityDetails";
import CommunityCreate from "./pages/Community/communityCreate";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./userContext/AuthContext";

const App = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const router = createBrowserRouter([
    /* ---------------- PUBLIC ---------------- */
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },

    /* ---------------- COMMUNITY ---------------- */
    {
      path: "/community",
      element: (
        <>
          <Navbar />
          <CommunityList />
        </>
      ),
    },
    {
      path: "/community/:id",
      element: (
        <>
          <Navbar />
          <CommunityDetails />
        </>
      ),
    },
    {
      path: "/community/create",
      element: isLoggedIn ? (
        <>
          <Navbar />
          <CommunityCreate />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },

    /* ---------------- CITIZEN ---------------- */
    {
      path: "/submitRequest",
      element: isLoggedIn && user?.role === "citizen" ? (
        <>
          <Navbar />
          <SubmitRequest />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },

    /* ---------------- OPERATOR ---------------- */
    {
      path: "/operator/home",
      element: isLoggedIn && user?.role === "operator" ? (
        <>
          <Navbar />
          <OperatorHome />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },

    /* ---------------- ADMIN ---------------- */
    {
      path: "/admin/home",
      element:
        isLoggedIn &&
        (user?.role === "wardAdmin" || user?.role === "superAdmin") ? (
          <>
            <Navbar />
            <AdminHome />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
    {
      path: "/admin/dashboard",
      element:
        isLoggedIn &&
        (user?.role === "wardAdmin" || user?.role === "superAdmin") ? (
          <>
            <Navbar />
            <AdminDashboard />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
    {
      path: "/admin/analytics",
      element:
        isLoggedIn &&
        (user?.role === "wardAdmin" || user?.role === "superAdmin") ? (
          <>
            <Navbar />
            <AdminAnalytics />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
