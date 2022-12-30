import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function LayoutWithFooter({ children }: any) {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-light-green-2 to-light-green-3 h-screen">
      {children}
      <Footer />
    </div>
  )
}
