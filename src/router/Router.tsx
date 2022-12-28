import Layout from '@app/components/Layout'
import AppSuspense from '@app/components/Suspense'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { createElement as _c, lazy, useEffect } from 'react'
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom'

interface PrivateRouteProps {
  Comp: () => JSX.Element
  role?: string
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const user = useAppSelector(userStore)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.uid) {
      navigate('/login', { state: window.location.pathname })
    }
    // if (!user.bankAccount && user.uid) {
    //   navigate('/profile')
    // }
  }, [navigate, user])
  return _c(props.Comp)
}

export default createBrowserRouter([
  {
    path: '/',
    element: _c(PrivateRoute, { Comp: Layout }),
    children: [
      {
        path: '',
        element: _c(Navigate, { to: 'home', replace: true }),
      },
      {
        path: 'home',
        element: _c(AppSuspense, null, _c(lazy(() => import('@app/page/Home')))),
      },
      {
        path: 'profile',
        element: _c(AppSuspense, null, _c(lazy(() => import('@app/page/Profile')))),
      },
      {
        path: 'events',
        element: <Outlet />,
        children: [
          {
            path: 'add',
            element: _c(AppSuspense, null, _c(lazy(() => import('@app/page/Events/Add')))),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: _c(AppSuspense, null, _c(lazy(() => import('@app/page/Login')))),
  },

  {
    path: '*',
    element: _c(AppSuspense, null, _c(lazy(() => import('@app/page/notfound')))),
  },
])
