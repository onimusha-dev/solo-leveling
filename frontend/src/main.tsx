import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import Missions from './pages/Missions/Missions'
import Feeds from './pages/Feeds/Feeds'
import Profile from './pages/Profile/Profile'
import Error404 from './Components/Error404'
import MainLayout from './layouts/MainLayout'
import SettingsLayout from './layouts/SettingsLayout'
import Settings from './pages/Settings/Index'
import SupportUs from './pages/Settings/pages/SupportUs'
import General from './pages/Settings/pages/General'
import PrivacyAndSafety from './pages/Settings/pages/PrivacyAndSafety'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { Navigate } from 'react-router'
import PrivacyPolicy from './pages/Policies/PrivacyPolicy'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'missions', element: <Missions /> },
        { path: 'feeds', element: <Feeds /> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', 
          element: <SettingsLayout />,
          children: [
            { index: true, element: <Settings /> },
            { path: "general", element: <General /> },
            { path: "privacy_and_safety", element: <PrivacyAndSafety /> },
            { path: "privacy", element: <Feeds /> },
            { path: "help", element: <Profile /> },
            { path: "support-us", element: <SupportUs /> },
          ]
        },
      ]
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <Home /> },
      ]
    },
    {
      path: 'policies',
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="privacy" replace /> },
        { path: 'privacy', element: <PrivacyPolicy /> },
      ]
    },
    {
      path: '*',
      element: <Error404 />
    }
  ]
)























createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
