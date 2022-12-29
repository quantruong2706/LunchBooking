import { Outlet } from 'react-router-dom'
import Footer from './Footer'


export default function LayoutWithFooter() {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-light-green-2 to-light-green-3 h-screen">
      <Outlet />

      <Footer />
    </div>
  )
}
