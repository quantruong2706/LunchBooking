import { RouterProvider } from 'react-router-dom'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import router from '../router/Router'

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
