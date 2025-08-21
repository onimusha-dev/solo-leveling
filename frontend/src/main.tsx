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
