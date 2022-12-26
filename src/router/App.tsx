import { RouterProvider } from 'react-router-dom'
import { store } from '../stores'
import { Provider } from 'react-redux'
import router from '@app/router/Router'
import { usersCol } from '../server/useDB'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
function App() {
  const getFbDoc = async () => {
    const userDocRef = doc(usersCol, 'dtqhuong1')
    const userDoc = await getDoc(userDocRef)
    const userData = userDoc.data()
    if (userData) console.log('asdasdasd', userData)
  }
  useEffect(() => {
    getFbDoc()
  }, [])
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
