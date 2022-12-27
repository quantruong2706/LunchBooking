import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import React from 'react'

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
    <div className='flex flex-col justify-between bg-green-400 h-screen'>
      <div className='flex flex-wrap justify-start gap-4 items-center p-3'>
        <img src={user.photoURL} alt='' referrerPolicy='no-referrer' className='rounded-xl w-16' />
        <div>
          <p className='text-black'>Hello, {user.displayName}!</p>
          <button onClick={logout} className='hover:font-bold'>Logout</button>
        </div>
      </div>

      <Outlet />

      <div
        className='flex bg-white h-18 px-3 py-2 items-center justify-around sm:justify-center sm:gap-12'>
        Footer here
      </div>
    </div>
  )
}
