import { LoadingScreen } from '@app/components/Suspense'
import theme from '@app/style/theme'
import { ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect ,useCallback} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { RouterProvider } from 'react-router-dom'

import Router from './router/Router'
import { auth } from './server/firebase'
import { useAppDispatch } from './stores/hook'
import { initializeUser } from './stores/user'

import { EventColection, EventDetailColection, UserDetail, usersColection } from './server/useDB'
import { doc, documentId, getDoc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { setListEvent } from './stores/listEvent'
import { setListEventDetail } from './stores/listEventDetail'

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
    if (loggedInUser) {
      const { uid, displayName, email, photoURL } = loggedInUser
      dispatch(initializeUser(loggedInUser))
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
