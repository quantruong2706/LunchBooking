import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" replace />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  { path: 'login', element: <Login /> },
])
