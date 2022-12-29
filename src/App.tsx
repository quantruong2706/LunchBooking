import { LoadingScreen } from '@app/components/Suspense'
import theme from '@app/style/theme'
import { ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { RouterProvider } from 'react-router-dom'

import Router from './router/Router'
import { auth } from './server/firebase'
import { UserDetail, usersColection } from './server/useDB'
import { useAppDispatch } from './stores/hook'
import { setUser } from './stores/user'

function App() {
  const [loggedInUser, loading] = useAuthState(auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(usersColection, loggedInUser?.uid as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            uid: loggedInUser?.uid,
            address: '',
            age: '',
            bankAccount: '',
            name: loggedInUser?.displayName,
            phone: '',
            // photoURL: loggedInUser?.photoURL
          },
          { merge: true }
        )
      } catch (error) {
        console.log('ERROR SETTING USER INFO IN DB', error)
      }
    }

    if (loggedInUser) {
      const { uid, displayName, email, photoURL } = loggedInUser
      getDoc(UserDetail(uid)).then((res) => {
        if (!res.id) {
          setUserInDb()
        }
      })
      dispatch(
        setUser({
          uid,
          displayName: displayName || 'unknown',
          email: email || 'undefined',
          photoURL: photoURL || '',
        })
      )
    }
  }, [loggedInUser, dispatch])
  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={Router} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
