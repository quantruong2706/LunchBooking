import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col justify-between bg-green-400 h-screen">
      <Outlet />

      <div className="flex bg-white h-16 px-3 py-2 items-center justify-around sm:justify-center sm:gap-12">Footer here</div>
    </div>
  )
}
