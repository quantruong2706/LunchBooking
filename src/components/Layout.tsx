import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col justify-between  bg-gradient-to-t from-primary-color to-light-color h-screen">
      <Outlet />
    </div>
  )
}
