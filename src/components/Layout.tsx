import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import { Container } from '@mui/system'
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom'

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
    <div className="flex flex-col justify-between bg-gradient-to-b from-light-green-2 to-light-green-3 h-screen">
      <Outlet />
    </div>
  )
}
