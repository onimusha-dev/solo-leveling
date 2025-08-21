import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import Settings from './pages/Settings/Settings'
import Missions from './pages/Missions/Missions'
import Feeds from './pages/Feeds'
import Profile from './pages/Profile/Profile'
import Error404 from './Components/Error404'


const router = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        { index: true, element: <Home /> },
        { path: 'missions', element: <Missions /> },
        { path: 'feeds', element: <Feeds /> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
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
