import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import RaiseRequest from "./pages/Citizen/raiseRequest";
import MyRequests from "./pages/Citizen/myRequest";
import RequestDetails from "./pages/Citizen/requestDetails";

import OperatorAssigned from "./pages/Operator/operatorAssigned";

import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminAnalytics from "./pages/Admin/adminAnalytics";
import AdminOperators from "./pages/Admin/adminOperator";

import CommunityList from "./pages/Community/communityList";
import CommunityDetails from "./pages/Community/communityDetails";
import CommunityCreate from "./pages/Community/communityCreate";

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
      path: "/raise-request",
      element:
        isLoggedIn && user?.role === "citizen" ? (
          <>
            <Navbar />
            <RaiseRequest />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
    {
      path: "/my-requests",
      element:
        isLoggedIn && user?.role === "citizen" ? (
          <>
            <Navbar />
            <MyRequests />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
    {
      path: "/requests/:id",
      element:
        isLoggedIn && user?.role === "citizen" ? (
          <>
            <Navbar />
            <RequestDetails />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },

    /* ---------------- OPERATOR ---------------- */
    {
      path: "/operator/assigned",
      element:
        isLoggedIn && user?.role === "operator" ? (
          <>
            <Navbar />
            <OperatorAssigned />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },

    /* ---------------- ADMIN ---------------- */
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
    {
      path: "/admin/operators",
      element:
        isLoggedIn &&
        (user?.role === "wardAdmin" || user?.role === "superAdmin") ? (
          <>
            <Navbar />
            <AdminOperators />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
