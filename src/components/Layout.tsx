import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import { signOut } from 'firebase/auth'
import { Link, Outlet } from 'react-router-dom'

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
    <div>
      <ul>
        <li>
          <Link to="/home">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
        <li>
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
        </li>
      </ul>

      <Outlet />
    </div>
  )
}
