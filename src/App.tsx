import { LoadingScreen } from '@app/components/Suspense'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { RouterProvider } from 'react-router-dom'

import Router from './router/Router'
import { auth } from './server/firebase'
import { userId } from './server/useDB'
import { useAppDispatch } from './stores/hook'
import { setUser } from './stores/user'

function App() {
  const [loggedInUser, loading] = useAuthState(auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(userId, loggedInUser?.uid as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            uid: loggedInUser?.uid,
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
      dispatch(
        setUser({
          uid,
          displayName: displayName || 'unknown',
          email: email || 'undefined',
          photoURL: photoURL || '',
        })
      )
      setUserInDb()
    }
  }, [loggedInUser, dispatch])
  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    )
  }
  return <RouterProvider router={Router} />
}

export default App
