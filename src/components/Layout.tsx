import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-light-green-2 to-light-green-3 h-screen">
      <Outlet />
    </div>
  )
}
