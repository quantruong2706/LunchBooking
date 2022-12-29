import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


export default function Layout() {
  const user = useAppSelector(userStore)
  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        store.dispatch(clearUser())
      })
    } catch (error) {
      console.log('ERROR LOGGING OUT', error)
    }
  }
  return (
    <div className="flex flex-col justify-between bg-light-green-2 h-screen">
      <Outlet />

      <Footer />
    </div>
  )
}
