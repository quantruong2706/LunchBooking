import { LoadingScreen } from '@app/components/Suspense'
import theme from '@app/style/theme'
import { ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { doc, documentId, getDoc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useCallback, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { RouterProvider } from 'react-router-dom'

import { getListUser } from './libs/api/events'
import Router from './router/Router'
import { auth } from './server/firebase'
import { EventColection, EventDetailColection, UserDetail, usersColection } from './server/useDB'
import { useAppDispatch } from './stores/hook'
import { setListEvent } from './stores/listEvent'
import { setListEventDetail } from './stores/listEventDetail'
import { setListUser } from './stores/listUser'
import { setUser } from './stores/user'

function App() {
  const [loggedInUser, loading] = useAuthState(auth)
  const dispatch = useAppDispatch()

  const getListEvent = useCallback(
    (documentids: string[]) => {
      const q = query(EventColection, where(documentId(), 'in', documentids))
      onSnapshot(q, (res) => {
        dispatch(
          setListEvent(
            res.docs.map((item) => {
              return {
                ...item.data(),
                id: item.id,
              }
            })
          )
        )
      })
    },
    [dispatch]
  )

  const getListEventDetail = useCallback(
    (uid: string) => {
      const q = query(EventDetailColection)
      onSnapshot(q, (res) => {
        // dispatch(setListEvent)
        const ListEventDetail = res.docs.map((item) => item.data())
        // console.log(
        //   'ListEventDetail',
        //   ListEventDetail.map((item) => item.eventId)
        // )
        dispatch(setListEventDetail(ListEventDetail))
        getListEvent(ListEventDetail.map((item) => item.eventId!))
      })
    },
    [getListEvent, dispatch]
  )

  useEffect(() => {
    getListUser().then((e) => {
      dispatch(setListUser(e))
    })
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
        if (!res.data()?.uid) {
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
      getListEventDetail(uid)
    }
  }, [loggedInUser, dispatch, getListEventDetail, getListEvent])
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
